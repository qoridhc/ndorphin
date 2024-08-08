package com.web.ndolphin.controller;

import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.notification.request.NotificationRequestDto;
import com.web.ndolphin.service.impl.NotificationServiceImpl;
import com.web.ndolphin.util.LogUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "알림 컨트롤러", description = "알림 API입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    private final NotificationServiceImpl notificationService;

    @Operation(summary = "알림 생성", description = "새로운 알림을 생성합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "알림이 성공적으로 생성되었습니다.",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류입니다.",
            content = @Content(schema = @Schema()))
    })
    @PostMapping("/{userId}")
    public ResponseEntity<ResponseDto> createNotification(
        @Parameter(description = "알림을 생성할 사용자의 ID", required = true) @PathVariable Long userId,
        @Parameter(description = "알림 생성 요청 데이터", required = true) @RequestBody NotificationRequestDto dto) {

        LogUtil.info("createNotification", dto);

        ResponseEntity<ResponseDto> response = notificationService.create(userId, dto);

        return response;
    }

    @Operation(summary = "모든 알림 조회 (모든 알림 자동 읽음 처리)", description = "사용자의 모든 알림을 조회합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "알림 조회 성공",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "404", description = "사용자의 알림을 찾을 수 없음",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류입니다.",
            content = @Content(schema = @Schema()))
    })
    @GetMapping("/{userId}")
    public ResponseEntity<ResponseDto> getAllNotification(
        @Parameter(description = "알림을 조회할 사용자의 ID", required = true) @PathVariable Long userId) {

        ResponseEntity<ResponseDto> response = notificationService.selectAllByUserId(userId);

        return response;
    }

    @GetMapping("/unread/{userId}")
    public ResponseEntity<ResponseDto> checkNewNotification(
        @Parameter(description = "현재유저 읽지 않은 알림 존재 여부 ", required = true)
        @PathVariable Long userId
    ) {

        ResponseEntity<ResponseDto> response = notificationService.checkUnReadNotifications(userId);

        return response;
    }

    @Operation(summary = "알림 삭제", description = "기존 알림을 삭제합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "알림 삭제 성공",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "404", description = "알림을 찾을 수 없음",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류입니다.",
            content = @Content(schema = @Schema()))
    })
    @DeleteMapping("/{userId}")
    public ResponseEntity<ResponseDto> deleteAllNotification(
        @Parameter(description = "삭제할 알림의 ID", required = true) @PathVariable Long userId) {

        ResponseEntity<ResponseDto> response = notificationService.deleteAllByUserId(userId);

        return response;
    }
}

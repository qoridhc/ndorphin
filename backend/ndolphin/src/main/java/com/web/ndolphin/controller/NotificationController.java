package com.web.ndolphin.controller;

import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.notification.request.NotificationRequestDto;
import com.web.ndolphin.service.impl.NotificationServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

        ResponseEntity<ResponseDto> response = notificationService.create(userId, dto);

        return response;
    }

    @Operation(summary = "모든 알림 조회", description = "사용자의 모든 알림을 조회합니다.")
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

    @Operation(summary = "알림 삭제", description = "기존 알림을 삭제합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "알림 삭제 성공",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "404", description = "알림을 찾을 수 없음",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류입니다.",
            content = @Content(schema = @Schema()))
    })
    @DeleteMapping("/{notificationId}")
    public ResponseEntity<ResponseDto> deleteNotification(
        @Parameter(description = "삭제할 알림의 ID", required = true) @PathVariable Long notificationId) {

        ResponseEntity<ResponseDto> response = notificationService.delete(notificationId);

        return response;
    }
}

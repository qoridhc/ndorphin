package com.web.ndolphin.controller;

import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.follow.request.FollowRequestDto;
import com.web.ndolphin.service.impl.FollowServiceImpl;
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

@Tag(name = "팔로우 컨트롤러", description = "팔로우 관리 API입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/follows")
public class FollowController {

    private final FollowServiceImpl followService;

    @Operation(summary = "팔로우 추가", description = "특정 사용자를 팔로우합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "팔로우 성공",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류",
            content = @Content(schema = @Schema()))
    })
    @PostMapping("/{userId}")
    public ResponseEntity<ResponseDto> follow(
        @Parameter(description = "팔로우할 사용자의 ID", required = true) @PathVariable Long userId,
        @Parameter(description = "팔로우 요청 데이터", required = true) @RequestBody FollowRequestDto dto) {

        ResponseEntity<ResponseDto> response = followService.createFollow(userId, dto);

        return response;
    }

    @Operation(summary = "팔로워 조회", description = "특정 사용자의 팔로워 목록을 조회합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "팔로워 목록 조회 성공",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없음",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류",
            content = @Content(schema = @Schema()))
    })
    @GetMapping("/followers/{userId}")
    public ResponseEntity<ResponseDto> getFollowers(
        @Parameter(description = "팔로워 목록을 조회할 사용자의 ID", required = true) @PathVariable Long userId) {

        ResponseEntity<ResponseDto> response = followService.getFollowers(userId);

        return response;
    }

    @Operation(summary = "팔로잉 조회", description = "특정 사용자의 팔로잉 목록을 조회합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "팔로잉 목록 조회 성공",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없음",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류",
            content = @Content(schema = @Schema()))
    })
    @GetMapping("/followings/{userId}")
    public ResponseEntity<ResponseDto> getFollowings(
        @Parameter(description = "팔로잉 목록을 조회할 사용자의 ID", required = true) @PathVariable Long userId) {

        ResponseEntity<ResponseDto> response = followService.getFollowings(userId);

        return response;
    }

    @Operation(summary = "팔로우 삭제", description = "특정 사용자를 언팔로우합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "팔로우 삭제 성공",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "404", description = "팔로우를 찾을 수 없음",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류",
            content = @Content(schema = @Schema()))
    })
    @DeleteMapping("/{followerId}")
    public ResponseEntity<ResponseDto> deleteFollow(
        @Parameter(description = "팔로워의 ID", required = true) @PathVariable Long followerId,
        @Parameter(description = "언팔로우할 상대방 유저 ID", required = true) @RequestBody FollowRequestDto dto
    ) {

        ResponseEntity<ResponseDto> response = followService.deleteFollow(followerId, dto.getFollowingId());

        return response;
    }
}

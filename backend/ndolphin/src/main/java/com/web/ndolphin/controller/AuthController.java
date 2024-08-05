package com.web.ndolphin.controller;

import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.auth.request.TokenRequestDto;
import com.web.ndolphin.service.impl.TokenServiceImpl;
import com.web.ndolphin.service.impl.UserServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "인증 컨트롤러", description = "인증 관련 API입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final UserServiceImpl userService;
    private final TokenServiceImpl tokenService;

    @Operation(summary = "OAuth 응답 처리", description = "OAuth 로그인 응답을 처리합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "로그인 성공", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content(schema = @Schema()))
    })
    @GetMapping("/oauth-response/{userId}")
    public void oauthResponse(
        HttpServletRequest request,
        HttpServletResponse response,
        @Parameter(description = "사용자 ID", required = true) @PathVariable("userId") Long userId) {

        userService.signIn(request, response, userId);
    }

    @Operation(summary = "토큰 재발급", description = "JWT 토큰을 재발급합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "토큰 재발급 성공", content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content(schema = @Schema()))
    })
    @PostMapping("/token/reissue")
    public ResponseEntity<ResponseDto> reissueToken(
        @Parameter(description = "토큰 재발급 요청 정보", required = true) @RequestBody TokenRequestDto tokenRequestDto) {

        ResponseEntity<ResponseDto> response = tokenService.reissue(tokenRequestDto);
        return response;
    }
}

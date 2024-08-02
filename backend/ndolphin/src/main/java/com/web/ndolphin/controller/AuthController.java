package com.web.ndolphin.controller;

import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.auth.request.TokenRequestDto;
import com.web.ndolphin.service.impl.TokenServiceImpl;
import com.web.ndolphin.service.impl.UserServiceImpl;
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

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final UserServiceImpl userService;
    private final TokenServiceImpl tokenService;

    @GetMapping("/oauth-response/{userId}")
    public ResponseEntity<ResponseDto> oauthResponse(HttpServletRequest request, HttpServletResponse response,
        @PathVariable("userId") Long userId) {

        userService.signIn(request, response, userId);

        return null;
    }

    @PostMapping("/token/reissue")
    public ResponseEntity<ResponseDto> reissueToken(@RequestBody TokenRequestDto tokenRequestDto) {

        ResponseEntity<ResponseDto> response = tokenService.reissue(tokenRequestDto);

        return response;
    }

}

package com.web.ndolphin.controller;

import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.auth.request.TokenRequestDto;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.service.impl.AuthServiceImpl;
import com.web.ndolphin.service.impl.TokenServiceImpl;
import com.web.ndolphin.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserServiceImpl userService;
    private final UserRepository userRepository;
    private final AuthServiceImpl authService;
    private final TokenServiceImpl tokenService;

    @GetMapping("/oauth-response/{userId}")
    public ResponseEntity<ResponseDto> oauthResponse(@PathVariable("userId") Long userId) {

        ResponseEntity<ResponseDto> response = userService.signIn(userId);

        return response;
    }

    @PostMapping("/token/reissue")
    public ResponseEntity<ResponseDto> reissueToken(@RequestBody TokenRequestDto tokenRequestDto) {

        ResponseEntity<ResponseDto> response = tokenService.reissue(tokenRequestDto);

        return response;
    }

}

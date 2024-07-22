package com.web.ndolphin.controller;

import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.auth.request.TokenRequestDto;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.service.impl.AuthServiceImpl;
import com.web.ndolphin.service.impl.TokenServiceImpl;
import com.web.ndolphin.service.impl.UserServiceImpl;
import com.web.ndolphin.util.LogUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.http.HttpStatus;
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

        LogUtil.info("tokenRequestDto", tokenRequestDto);

        ResponseEntity<ResponseDto> response = tokenService.reissue(tokenRequestDto);

        LogUtil.info("tokenResponseDto", response);

        return response;
    }


    @GetMapping("/test")
    public ResponseEntity<ResponseDto> test() {
        LogUtil.info("111111");

        User user = userRepository.findByUserId(1L);

        LogUtil.info("user", user.toString());

        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto());
    }
}

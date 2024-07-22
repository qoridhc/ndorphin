package com.web.ndolphin.controller;

import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.service.impl.UserServiceImpl;
import com.web.ndolphin.util.LogUtil;
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

    @GetMapping("/oauth-response/{userId}")
    public ResponseEntity<ResponseDto> oauthResponse(@PathVariable("userId") Long userId) {

        ResponseEntity<ResponseDto> response = userService.signIn(userId);

        return response;
    }

    @GetMapping("/token/reissue")
    public ResponseEntity<ResponseDto> reissueToken(@PathVariable("userId") Long userId) {

        ResponseEntity<ResponseDto> response = userService.signIn(userId);

        return response;
    }


    @GetMapping("/test")
    public ResponseEntity<ResponseDto> test() {
        LogUtil.info("111111");
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto());
    }
}

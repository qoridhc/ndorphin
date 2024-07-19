package com.web.ndolphin.controller;

import com.web.ndolphin.dto.auth.request.EmailCheckRequestDto;
import com.web.ndolphin.dto.auth.request.SignUpRequestDto;
import com.web.ndolphin.dto.auth.response.EmailCheckResponseDto;
import com.web.ndolphin.dto.auth.response.SignUpResponseDto;
import com.web.ndolphin.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

}

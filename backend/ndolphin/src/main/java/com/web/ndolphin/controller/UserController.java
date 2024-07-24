package com.web.ndolphin.controller;

import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.user.request.UserUpdateRequestDto;
import com.web.ndolphin.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserServiceImpl userService;

    @DeleteMapping("/{userId}")
    public ResponseEntity<ResponseDto> deleteUser(@PathVariable("userId") Long userId) {

        return userService.deleteUser(userId);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<ResponseDto> updateUser(
        @PathVariable("userId") Long userId,
        @RequestBody UserUpdateRequestDto updateDto) {

        return userService.updateUser(userId, updateDto);
    }

}

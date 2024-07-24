package com.web.ndolphin.controller;

import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.follow.request.FollowRequestDto;
import com.web.ndolphin.service.impl.FollowServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/follows")
public class FollowController {

    private final FollowServiceImpl followService;

    @PostMapping("/{userId}")
    public ResponseEntity<ResponseDto> follow(@PathVariable Long userId, @RequestBody FollowRequestDto dto) {

        ResponseEntity<ResponseDto> response = followService.createFollow(userId, dto);

        return response;
    }

}

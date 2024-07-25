package com.web.ndolphin.controller;

import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.follow.request.FollowRequestDto;
import com.web.ndolphin.service.impl.FollowServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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

    @GetMapping("/followers/{userId}")
    public ResponseEntity<ResponseDto> getFollowers(@PathVariable Long userId) {

        ResponseEntity<ResponseDto> response = followService.getFollowers(userId);

        return response;
    }

    @GetMapping("/followings/{userId}")
    public ResponseEntity<ResponseDto> getFollowings(@PathVariable Long userId) {

        ResponseEntity<ResponseDto> response = followService.getFollowings(userId);

        return response;
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity<ResponseDto> deleteFollow(@PathVariable Long boardId) {

        ResponseEntity<ResponseDto> response = followService.deleteFollow(boardId);

        return response;
    }


}

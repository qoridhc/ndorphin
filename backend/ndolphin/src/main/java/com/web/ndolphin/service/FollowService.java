package com.web.ndolphin.service;

import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.follow.request.FollowRequestDto;
import org.springframework.http.ResponseEntity;

public interface FollowService {

    ResponseEntity<ResponseDto> createFollow(Long userId, FollowRequestDto dto);

    ResponseEntity<ResponseDto> getFollowers(Long userId);

}

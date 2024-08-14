package com.web.ndolphin.service.interfaces;

import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.follow.request.FollowRequestDto;
import org.springframework.http.ResponseEntity;

public interface FollowService {

    ResponseEntity<ResponseDto> createFollow(Long userId, FollowRequestDto dto);

    ResponseEntity<ResponseDto> getFollowers(Long userId);

    ResponseEntity<ResponseDto> getFollowings(Long userId);

    ResponseEntity<ResponseDto> deleteFollow(Long followerId, Long followingId);

}

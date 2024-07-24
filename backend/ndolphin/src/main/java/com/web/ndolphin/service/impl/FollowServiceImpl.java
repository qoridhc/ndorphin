package com.web.ndolphin.service.impl;

import com.web.ndolphin.common.ResponseCode;
import com.web.ndolphin.common.ResponseMessage;
import com.web.ndolphin.domain.Follow;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.follow.FollowDto;
import com.web.ndolphin.dto.follow.request.FollowRequestDto;
import com.web.ndolphin.mapper.FollowMapper;
import com.web.ndolphin.repository.FollowRepository;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.service.FollowService;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService {

    private final FollowRepository followRepository;
    private final UserRepository userRepository;

    @Override
    public ResponseEntity<ResponseDto> createFollow(Long userId, FollowRequestDto dto) {

        try {
            Follow follow = new Follow();

            User followBy = userRepository.findByUserId(userId);
            User followTo = userRepository.findByUserId(dto.getFollowingId());

            follow.setFollower(followBy);
            follow.setFollowing(followTo);
            follow.setCreatedAt(LocalDateTime.now());
            
            followRepository.save(follow);

            FollowDto followDto = FollowMapper.toDto(follow);

            ResponseDto<FollowDto> responseBody = new ResponseDto<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                followDto
            );

            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        } catch (Exception e) {
            return ResponseDto.databaseError();
        }
    }

}

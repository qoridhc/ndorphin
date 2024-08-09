package com.web.ndolphin.service.impl;

import com.web.ndolphin.common.ResponseCode;
import com.web.ndolphin.common.ResponseMessage;
import com.web.ndolphin.domain.Follow;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.follow.FollowDto;
import com.web.ndolphin.dto.follow.request.FollowRequestDto;
import com.web.ndolphin.dto.follow.response.FollowerReponseDto;
import com.web.ndolphin.dto.follow.response.FollowingResponseDto;
import com.web.ndolphin.mapper.FollowMapper;
import com.web.ndolphin.repository.FollowRepository;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.service.interfaces.FollowService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
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

            User followBy = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("The userId does not exist: " + userId));

            User followTo = userRepository.findById(dto.getFollowingId())
                .orElseThrow(() -> new IllegalArgumentException("The userId does not exist: " + userId));

            Follow followEntity = FollowMapper.toEntity(followBy, followTo);

            followRepository.save(followEntity);

            FollowDto followDto = FollowMapper.toDto(followEntity);

            ResponseDto<FollowDto> responseBody = new ResponseDto<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                followDto
            );

            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        } catch (DataIntegrityViolationException e) {
            return ResponseDto.databaseError(
                "You are already following this user: : " + dto.getFollowingId());
        } catch (Exception e) {
            return ResponseDto.databaseError(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<ResponseDto> getFollowers(Long userId) {

        try {
            List<Follow> followers = followRepository.findAllByFollowing_UserId(userId);

            List<FollowerReponseDto> followerDtoList = FollowMapper.toFollwerResponseDtoList(followers);

            ResponseDto<List<FollowerReponseDto>> responseDto = new ResponseDto<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                followerDtoList
            );

            return ResponseEntity.status(HttpStatus.OK).body(responseDto);
        } catch (Exception e) {
            return ResponseDto.databaseError();
        }
    }

    @Override
    public ResponseEntity<ResponseDto> getFollowings(Long userId) {

        try {
            List<Follow> followings = followRepository.findAllByFollower_UserId(userId);

            List<FollowingResponseDto> followDtoList = FollowMapper.toFollwingResponseDtoList(followings);

            ResponseDto<List<FollowingResponseDto>> responseDto = new ResponseDto<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                followDtoList
            );

            return ResponseEntity.status(HttpStatus.OK).body(responseDto);
        } catch (Exception e) {
            return ResponseDto.databaseError();
        }
    }

    @Override
    public ResponseEntity<ResponseDto> deleteFollow(Long followerId, Long followingId) {

        try {

            User followBy = userRepository.findById(followerId)
                .orElseThrow(() -> new IllegalArgumentException("The userId does not exist: " + followerId));

            User followTo = userRepository.findById(followingId)
                .orElseThrow(() -> new IllegalArgumentException("The userId does not exist: " + followingId));

            Follow follow = followRepository.findByFollowerIdAndFollowingId(followerId, followingId)
                .orElseThrow(() -> new IllegalArgumentException(
                    String.format("Follow Relation does not exist: %d -> %d", followerId, followingId)));

            followRepository.delete(follow);

            return ResponseDto.success();
        } catch (Exception e) {
            return ResponseDto.databaseError(e.getMessage());
        }
    }

}

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
import jakarta.persistence.EntityNotFoundException;
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

            User followBy = userRepository.findByUserId(userId);
            User followTo = userRepository.findByUserId(dto.getFollowingId());

            if (followBy == null || followTo == null) {
                return ResponseDto.databaseError();
            }

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

            // 유니크 제약 조건 위반 처리
            ResponseDto responseBody = new ResponseDto("UC", "Duplilcate Follow");

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
        } catch (Exception e) {
            return ResponseDto.databaseError();
        }
    }

    public ResponseEntity<ResponseDto> getFollowers(Long userId) {

        try {
            List<Follow> followers = followRepository.findAllByFollowing_UserId(userId);

            List<FollowDto> followDtoList = FollowMapper.toDtoList(followers);

            ResponseDto<List<FollowDto>> responseDto = new ResponseDto<>(
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
    public ResponseEntity<ResponseDto> getFollowings(Long userId) {

        try {
            List<Follow> followings = followRepository.findAllByFollower_UserId(userId);

            List<FollowDto> followDtoList = FollowMapper.toDtoList(followings);

            ResponseDto<List<FollowDto>> responseDto = new ResponseDto<>(
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
    public ResponseEntity<ResponseDto> deleteFollow(Long boardId) {

        try {
            boolean existFollowId = followRepository.existsById(boardId);

            // 엔티티가 존재하지 않으면 예외를 던짐
            if (!existFollowId) {
                throw new EntityNotFoundException("The followId does not exist: " + boardId);
            }

            followRepository.deleteById(boardId);

            return ResponseDto.success();
        } catch (EntityNotFoundException e) {
            return ResponseDto.databaseError(e.getMessage());
        }
    }


}

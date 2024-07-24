package com.web.ndolphin.service.impl;

import com.web.ndolphin.common.ResponseCode;
import com.web.ndolphin.common.ResponseMessage;
import com.web.ndolphin.domain.Token;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.auth.response.OAuth2ResponseDto;
import com.web.ndolphin.dto.user.UserDto;
import com.web.ndolphin.dto.user.request.UserUpdateRequestDto;
import com.web.ndolphin.mapper.UserMapper;
import com.web.ndolphin.provider.JwtProvider;
import com.web.ndolphin.repository.TokenRepository;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.service.UserService;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final TokenRepository tokenRepository;

    @Override
    public ResponseEntity<ResponseDto> signIn(Long userId) {

        try {
            userRepository.findByUserId(userId);
        } catch (Exception e) {
            e.printStackTrace();
        }

        Token token = tokenRepository.findByUserId(userId);

        return OAuth2ResponseDto.success(token);
    }

    @Override
    @Transactional
    public ResponseEntity<ResponseDto> deleteUser(Long userId) {

        try {
            int deleteCnt = userRepository.deleteUserByUserId(userId);

            // 삭제 실패
            if (deleteCnt <= 0) {
                return ResponseDto.databaseError();
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return ResponseDto.success();
    }

    @Override
    @Transactional
    public ResponseEntity<ResponseDto> updateUser(Long userId, UserUpdateRequestDto dto) {
        try {

            // 유저를 조회
            User existingUser = userRepository.findByUserId(userId);

            // DTO를 사용하여 필드 업데이트
            if (dto.getEmail() != null) {
                existingUser.setEmail(dto.getEmail());
            }
            if (dto.getProfileImage() != null) {
                existingUser.setProfileImage(dto.getProfileImage());
            }
            if (dto.getNickName() != null) {
                existingUser.setNickName(dto.getNickName());
                existingUser.setNickNameUpdatedAt(LocalDateTime.now());
            }
            if (dto.getMbti() != null) {
                existingUser.setMbti(dto.getMbti());
            }
            if (dto.getNPoint() != null) {
                existingUser.setNPoint(dto.getNPoint());
            }
            if (dto.getRole() != null) {
                existingUser.setRole(dto.getRole());
            }

            existingUser.setUpdatedAt(LocalDateTime.now());

            userRepository.save(existingUser);

            UserDto userDto = UserMapper.convertToUserDto(existingUser);

            ResponseDto<UserDto> responseBody = new ResponseDto<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                userDto
            );

            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        } catch (Exception e) {
            return ResponseDto.databaseError();
        }
    }


}

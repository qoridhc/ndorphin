package com.web.ndolphin.service.impl;

import com.web.ndolphin.common.ResponseCode;
import com.web.ndolphin.common.ResponseMessage;
import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.Favorite;
import com.web.ndolphin.domain.NPoint;
import com.web.ndolphin.domain.PointRule;
import com.web.ndolphin.domain.Token;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.auth.response.OAuth2ResponseDto;
import com.web.ndolphin.dto.board.BoardDto;
import com.web.ndolphin.dto.favorite.FavoriteRequestDto;
import com.web.ndolphin.dto.favorite.FavoriteResponseDto;
import com.web.ndolphin.dto.npoint.request.NPointRequestDto;
import com.web.ndolphin.dto.npoint.resopnse.NPointResponseDto;
import com.web.ndolphin.dto.user.UserDto;
import com.web.ndolphin.dto.user.request.UserUpdateRequestDto;
import com.web.ndolphin.mapper.BoardConverter;
import com.web.ndolphin.mapper.FavoriteMapper;
import com.web.ndolphin.mapper.NPointMapper;
import com.web.ndolphin.mapper.UserMapper;
import com.web.ndolphin.provider.JwtProvider;
import com.web.ndolphin.repository.BoardRepository;
import com.web.ndolphin.repository.FavoriteRepository;
import com.web.ndolphin.repository.NPointRepository;
import com.web.ndolphin.repository.PointRuleRepository;
import com.web.ndolphin.repository.TokenRepository;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.service.interfaces.UserService;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final FavoriteRepository favoriteRepository;
    private final TokenRepository tokenRepository;
    private final NPointRepository nPointRepository;
    private final PointRuleRepository pointRuleRepository;

    private final JwtProvider jwtProvider;

    @Override
    public ResponseEntity<ResponseDto> signIn(Long userId) {

        User user = null;

        try {
            user = userRepository.findByUserId(userId);
        } catch (Exception e) {
            return ResponseDto.databaseError();
        }

        Token token = tokenRepository.findByUserId(userId);

        return OAuth2ResponseDto.success(token);
    }

    public ResponseEntity<ResponseDto> getUser(Long userId) {

        try {
            User user = userRepository.findByUserId(userId);

            UserDto userDto = UserMapper.toDto(user);

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
            return ResponseDto.databaseError();
        }

        return ResponseDto.success();
    }

    @Override
    @Transactional
    public ResponseEntity<ResponseDto> updateUser(Long userId, UserUpdateRequestDto dto) {

        try {
            User existingUser = userRepository.findByUserId(userId);

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

            UserDto userDto = UserMapper.toDto(existingUser);

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

    @Override
    public ResponseEntity<ResponseDto> getFavorites(Long userId) {

        List<Favorite> favorites = favoriteRepository.findByUserId(userId);
        List<BoardDto> boardDtos = favorites.stream()
            .map(favorite -> BoardConverter.convertToDto(favorite.getBoard()))
            .toList();

        FavoriteResponseDto favoriteResponseDto = FavoriteMapper.toDto(boardDtos);

        ResponseDto<FavoriteResponseDto> responseDto = new ResponseDto<>(
            ResponseCode.SUCCESS,
            ResponseMessage.SUCCESS,
            favoriteResponseDto
        );

        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    @Override
    public ResponseEntity<ResponseDto> addFavorite(FavoriteRequestDto favoriteRequestDto) {

        try {
            User user = userRepository.findById(favoriteRequestDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
            Board board = boardRepository.findById(favoriteRequestDto.getBoardId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid board ID"));

            Favorite favorite = FavoriteMapper.toEntity(user, board);

            favoriteRepository.save(favorite);

            return ResponseDto.success(); // 성공 시 응답
        } catch (DataIntegrityViolationException e) {
            return ResponseDto.databaseError("Favorite already exists for this user and board");
        } catch (Exception e) {
            return ResponseDto.databaseError(e.getMessage()); // 예외 발생 시 데이터베이스 에러 응답
        }
    }

    @Override
    public ResponseEntity<ResponseDto> removeFavorite(Long userId, Long boardId) {

        try {
            Favorite favorite = favoriteRepository.findByUserIdAndBoardId(userId, boardId)
                .orElseThrow(() -> new IllegalArgumentException("Favorite not found"));

            favoriteRepository.delete(favorite);

            return ResponseDto.success();
        } catch (Exception e) {
            return ResponseDto.databaseError(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<ResponseDto> addNPoint(Long userId, NPointRequestDto dto) {

        try {
            User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("The userId does not exist: " + userId));

            PointRule pointRule = pointRuleRepository.findById(dto.getPointRuleId())
                .orElseThrow(
                    () -> new IllegalArgumentException("The nPointRuleId does not exist: " + dto.getPointRuleId()));

            NPoint nPoint = NPointMapper.toEntity(user, pointRule);

            // 유저 nPoint 총합 증가
            user.setNPoint(user.getNPoint() + pointRule.getPoint());

            nPointRepository.save(nPoint);
            userRepository.save(user);

            NPointResponseDto nPointResponseDto = NPointMapper.toNPointResponseDto(user.getUserId(), user.getNPoint());

            ResponseDto<NPointResponseDto> responseBody = new ResponseDto<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                nPointResponseDto
            );

            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        } catch (IllegalArgumentException e) {
            return ResponseDto.databaseError(e.getMessage());
        } catch (Exception e) {
            return ResponseDto.databaseError(e.getMessage());
        }
    }

}

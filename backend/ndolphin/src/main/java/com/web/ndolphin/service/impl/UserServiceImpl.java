package com.web.ndolphin.service.impl;

import com.web.ndolphin.common.ResponseCode;
import com.web.ndolphin.common.ResponseMessage;
import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.EntityType;
import com.web.ndolphin.domain.Favorite;
import com.web.ndolphin.domain.NPoint;
import com.web.ndolphin.domain.PointRule;
import com.web.ndolphin.domain.Token;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.board.response.BoardDto;
import com.web.ndolphin.dto.favorite.FavoriteRequestDto;
import com.web.ndolphin.dto.favorite.FavoriteResponseDto;
import com.web.ndolphin.dto.npoint.request.NPointDeleteRequestDto;
import com.web.ndolphin.dto.npoint.request.NPointRequestDto;
import com.web.ndolphin.dto.npoint.resopnse.NPointResponseDto;
import com.web.ndolphin.dto.user.UserDto;
import com.web.ndolphin.dto.user.request.UserUpdateRequestDto;
import com.web.ndolphin.dto.user.response.BestNResponseDto;
import com.web.ndolphin.mapper.BoardMapper;
import com.web.ndolphin.mapper.FavoriteMapper;
import com.web.ndolphin.mapper.NPointMapper;
import com.web.ndolphin.mapper.UserMapper;
import com.web.ndolphin.repository.BoardRepository;
import com.web.ndolphin.repository.FavoriteRepository;
import com.web.ndolphin.repository.NPointRepository;
import com.web.ndolphin.repository.PointRuleRepository;
import com.web.ndolphin.repository.TokenRepository;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.service.interfaces.FileInfoService;
import com.web.ndolphin.service.interfaces.UserService;
import com.web.ndolphin.util.LogUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final FavoriteRepository favoriteRepository;
    private final TokenRepository tokenRepository;
    private final NPointRepository nPointRepository;
    private final PointRuleRepository pointRuleRepository;
    private final FileInfoService fileInfoService;

    @Override
    public void signIn(HttpServletRequest request, HttpServletResponse response, Long userId) {

        LogUtil.info("signIn 실행");

        User user = null;

        try {
            user = userRepository.findByUserId(userId);

            Token token = tokenRepository.findByUserId(userId);

            // userId 쿠키 설정
            Cookie userIdCookie = new Cookie("userId", String.valueOf(userId));
            userIdCookie.setMaxAge(3600); // 1시간 유효
            userIdCookie.setPath("/"); // 모든 경로에서 접근 가능

            // accessToken 쿠키 설정
            Cookie jwtCookie = new Cookie("accessToken", token.getAccessToken());
            jwtCookie.setMaxAge(3600); // 1시간 유효
            jwtCookie.setPath("/"); // 모든 경로에서 접근 가능

            // refreshToken 쿠키 설정
            Cookie refreshTokenCookie = new Cookie("refreshToken", token.getRefreshToken());
            refreshTokenCookie.setMaxAge(3600); // 1시간 유효
            refreshTokenCookie.setPath("/"); // 모든 경로에서 접근 가능

            // 쿠키를 응답에 추가
            response.addCookie(userIdCookie);
            response.addCookie(jwtCookie);
            response.addCookie(refreshTokenCookie);

            // 리다이렉트
            response.sendRedirect("http://localhost:3000");
//            response.sendRedirect("http://ec2-54-180-146-64.ap-northeast-2.compute.amazonaws.com:80");

        } catch (Exception e) {
            e.printStackTrace();
        }
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

            boolean existUser = userRepository.existsById(userId);

            LogUtil.info("existUser" + existUser);

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
    public ResponseEntity<ResponseDto> updateUser(Long userId, UserUpdateRequestDto dto,
        MultipartFile profileImage) {

        LogUtil.info("userId" + userId);
        LogUtil.info("UserUpdateRequestDto" + dto);
        LogUtil.info("profileImage" + profileImage);

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

            // 프로필 이미지가 존재하는 경우 처리
            if (profileImage != null && !profileImage.isEmpty()) {
                // 이미지 파일 처리 로직 (예: 저장, 변환 등)
                List<MultipartFile> multipartFiles = new ArrayList<>();
                multipartFiles.add(profileImage);

                fileInfoService.deleteAndDeleteFiles(existingUser.getUserId(), EntityType.USER);

                fileInfoService.uploadAndSaveFiles(
                    existingUser.getUserId(),
                    EntityType.USER,
                    multipartFiles
                );

                String fileUrl = fileInfoService.getFileUrl(existingUser.getUserId(),
                    EntityType.USER);

                existingUser.setProfileImage(fileUrl);
            }

            userRepository.save(existingUser);

            UserDto userDto = UserMapper.toDto(existingUser);

            ResponseDto<UserDto> responseBody = new ResponseDto<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                userDto
            );

            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        } catch (IllegalArgumentException e) {
            return ResponseDto.databaseError(e.getMessage());
        } catch (Exception e) {
            return ResponseDto.databaseError();
        }
    }

    @Override
    public ResponseEntity<ResponseDto> getFavorites(Long userId) {

        List<Favorite> favorites = favoriteRepository.findByUserId(userId);
        List<BoardDto> boardDtos = favorites.stream()
            .map(favorite -> BoardMapper.toBoardDto(favorite.getBoard()))
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
    public ResponseEntity<ResponseDto> checkNickName(String nickName) {

        boolean isDuplicateNickName = userRepository.existsByNickName(nickName);

        if (nickName == null) {
            return ResponseDto.databaseError("Empty NickName");
        }

        if (isDuplicateNickName) {
            return ResponseDto.databaseError("Duplicate NickName : " + nickName);
        }

        return ResponseDto.success();
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
                .orElseThrow(
                    () -> new IllegalArgumentException("The userId does not exist: " + userId));

            PointRule pointRule = pointRuleRepository.findById(dto.getPointRuleId())
                .orElseThrow(
                    () -> new IllegalArgumentException(
                        "The nPointRuleId does not exist: " + dto.getPointRuleId()));

            NPoint nPoint = NPointMapper.toEntity(user, pointRule);

            // 유저 nPoint 총합 증가
            user.setNPoint(user.getNPoint() + pointRule.getPoint());

            nPointRepository.save(nPoint);
            userRepository.save(user);

            NPointResponseDto nPointResponseDto = NPointMapper.toNPointResponseDto(user.getUserId(),
                user.getNPoint());

            ResponseDto<NPointResponseDto> responseBody = new ResponseDto<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                nPointResponseDto
            );

            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        } catch (IllegalArgumentException e) {
            return ResponseDto.databaseError(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<ResponseDto> deleteNPoint(Long userId, NPointDeleteRequestDto dto) {

        try {

            User user = userRepository.findById(userId)
                .orElseThrow(
                    () -> new IllegalArgumentException("The userId does not exist: " + userId));

            NPoint nPoint = nPointRepository.findById(dto.getPointId())
                .orElseThrow(
                    () -> new IllegalArgumentException("The userId does not exist: " + userId));

            user.setNPoint(user.getNPoint() - nPoint.getPointRule().getPoint());

            userRepository.save(user);

            nPointRepository.deleteById(dto.getPointId());

            NPointResponseDto nPointResponseDto = NPointMapper.toNPointResponseDto(user.getUserId(),
                user.getNPoint());

            ResponseDto<NPointResponseDto> responseBody = new ResponseDto<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                nPointResponseDto
            );

            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        } catch (Exception e) {
            return ResponseDto.databaseError(e.getMessage());
        }
    }

    @Override
    public List<BestNResponseDto> getSortedUsersByNPoint(boolean flag) {

        List<User> users = flag
            ? userRepository.findAllUsersSortedByNPoint()
            : userRepository.findTopUsersByNPoint(1);

        return IntStream.range(0, users.size())
            .mapToObj(i -> new BestNResponseDto((long) (i + 1), users.get(i).getNickName(),
                users.get(i).getNPoint()))
            .collect(Collectors.toList());
    }
}

package com.web.ndolphin.service.impl;

import com.web.ndolphin.domain.Token;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.auth.request.TokenRequestDto;
import com.web.ndolphin.dto.auth.response.TokenResponseDto;
import com.web.ndolphin.provider.JwtProvider;
import com.web.ndolphin.repository.TokenRepository;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.service.TokenService;
import com.web.ndolphin.util.LogUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final JwtProvider jwtProvider;

    @Override
    @Transactional
    public ResponseEntity<ResponseDto> reissue(TokenRequestDto requestDto) {

        LogUtil.info("requestDto", requestDto);

        String userId = jwtProvider.validate(requestDto.getRefreshToken());
        LogUtil.info("userId", userId);

        // Refresh Token 검증
        if (userId == null) {
            return TokenResponseDto.unAuthorized();
        }

        Token token = tokenRepository.findByUserId(Long.valueOf(userId));

        if (token == null)
            return ResponseDto.databaseError();

        String newAccessToken = jwtProvider.generateAccessToken(userId);

        token.setAccessToken(newAccessToken);

        tokenRepository.save(token);

        // 토큰 발급
        return TokenResponseDto.success(token);
    }

    @Transactional
    public void saveOrUpdateToken(Token token) {
        // userId로 사용자(User) 찾기
        User user = userRepository.findById(token.getUser().getUserId())
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다"));

        // 이 사용자에 대한 토큰(Token)이 이미 존재하는지 확인
        Token existingToken = tokenRepository.findByUserId(user.getUserId());

        if (existingToken != null) {
            // 기존 토큰 업데이트
            existingToken.setAccessToken(token.getAccessToken());
            existingToken.setRefreshToken(token.getRefreshToken());

            tokenRepository.save(existingToken); // 업데이트된 토큰 저장
        } else {
            // 새로운 토큰 생성 및 저장
            tokenRepository.save(token); // 새로운 토큰 저장
        }
    }


}

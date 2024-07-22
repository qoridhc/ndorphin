package com.web.ndolphin.service.impl;

import com.web.ndolphin.domain.Token;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.repository.TokenRepository;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.service.TokenService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;

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

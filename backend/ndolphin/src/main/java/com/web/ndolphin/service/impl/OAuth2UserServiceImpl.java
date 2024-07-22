package com.web.ndolphin.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.ndolphin.domain.*;
import com.web.ndolphin.provider.JwtProvider;
import com.web.ndolphin.repository.TokenRepository;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.service.TokenService;
import com.web.ndolphin.util.LogUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class OAuth2UserServiceImpl extends DefaultOAuth2UserService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final TokenServiceImpl tokenService;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(request);
        String oauthClientName = request.getClientRegistration().getClientName(); // 어떤 OAuth 요청인지 naver, kakao...

        LogUtil.info("request", request);

        User user = new User();

        try {

            Map<String, Object> responseMap;

            // 카카오 로그인 처리
            if (oauthClientName.equals("kakao")) {
                responseMap = oAuth2User.getAttributes();

                Map<String, Object> kakaoAccount = (Map<String, Object>) responseMap.get("kakao_account");

                LogUtil.info("responseMap", responseMap);
                LogUtil.info("kakaoAccount", kakaoAccount);

                user.setEmail((String) kakaoAccount.get("email"));
                user.setType(LoginType.KAKAO);
            }

            // 네이버 로그인 처리
            if (oauthClientName.equals("naver")) {
                responseMap = (Map<String, Object>) oAuth2User.getAttributes().get("response");

                LogUtil.info("responseMap: {}", responseMap);

                user.setEmail((String) responseMap.get("email"));
                user.setType(LoginType.NAVER);
            }

            boolean isExistUserEmail = userRepository.existsByEmail(user.getEmail());

            user.setRole(RoleType.USER);

            // 이미 회원가입 된 아이디 -> DB 저장 필요 X
            if (isExistUserEmail) {
                // 기존 유저 장보 가져옴
                user = userRepository.findByEmail(user.getEmail());
            } else {
                // DB에 유저 정보 저장 (회원가입)
                user = userRepository.save(user);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        String accessToken = jwtProvider.generateAccessToken(String.valueOf(user.getUserId()));
        String refreshToken = jwtProvider.generagteRefreshToken(String.valueOf(user.getUserId()));

        tokenService.saveOrUpdateToken(new Token(user, accessToken, refreshToken));

        return new CustomOAuth2User(user.getUserId(), accessToken);
    }

}

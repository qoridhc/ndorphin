package com.web.ndolphin.service.impl;

import com.web.ndolphin.domain.CustomOAuth2User;
import com.web.ndolphin.domain.LoginType;
import com.web.ndolphin.domain.RoleType;
import com.web.ndolphin.domain.Token;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.provider.JwtProvider;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.util.LogUtil;
import java.time.LocalDateTime;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

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
        String oauthClientName = request.getClientRegistration()
            .getClientName(); // 어떤 OAuth 요청인지 naver, kakao...

        LogUtil.info("request", request);

        User user = new User();

        LogUtil.info("oauthClientName", oauthClientName);

        try {

            Map<String, Object> responseMap;

            // 카카오 로그인 처리
            if (oauthClientName.equals("kakao")) {
                responseMap = oAuth2User.getAttributes();

                Map<String, Object> kakaoAccount = (Map<String, Object>) responseMap.get(
                    "kakao_account");

                user.setEmail((String) kakaoAccount.get("email"));
                user.setType(LoginType.KAKAO);
            }

            // 구글 로그인 처리
            if (oauthClientName.equals("Google")) {
                responseMap = (Map<String, Object>) oAuth2User.getAttributes();

                user.setEmail((String) responseMap.get("email"));
                user.setType(LoginType.GOOGLE);
            }

            // 네이버 로그인 처리
            if (oauthClientName.equals("naver")) {
                responseMap = (Map<String, Object>) oAuth2User.getAttributes().get("response");

                user.setEmail((String) responseMap.get("email"));
                user.setType(LoginType.NAVER);
            }

            boolean isExistUserEmail = userRepository.existsByEmail(user.getEmail());

            user.setRole(RoleType.USER);
            user.setNPoint(0L);

            // 이미 회원가입 된 아이디 -> DB 저장 필요 X
            if (isExistUserEmail) {
                // 기존 유저 장보 가져옴
                user = userRepository.findByEmail(user.getEmail());
            } else {
                // DB에 유저 정보 저장 (회원가입)
                user.setCreatedAt(LocalDateTime.now());
                user.setProfileImage("/images/default_profile.png");
                user = userRepository.save(user);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        String accessToken = jwtProvider.generateAccessToken(String.valueOf(user.getUserId()));
        String refreshToken = jwtProvider.generagteRefreshToken(String.valueOf(user.getUserId()));

        tokenService.saveOrUpdateToken(new Token(user, accessToken, refreshToken));

        return new CustomOAuth2User(user.getUserId(), accessToken, refreshToken);
    }

}

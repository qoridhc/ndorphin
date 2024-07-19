package com.web.ndolphin.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.ndolphin.domain.CustomOAuth2User;
import com.web.ndolphin.domain.LoginType;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.util.LogUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class OAuth2UserServiceImpl extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(request);
        String oauthClientName = request.getClientRegistration().getClientName(); // 어떤 OAuth 요청인지 naver, kakao...

        LogUtil.info("request", request);

        User user = new User();

        try {

            Map<String, Object> responseMap;

            if (oauthClientName.equals("kakao")) {

                 responseMap = oAuth2User.getAttributes();
                 LogUtil.info("responseMap: {}", responseMap);
                user.setEmail((String) responseMap.get("email"));
                user.setType(LoginType.KAKAO);
            }

            if (oauthClientName.equals("naver")) {
                responseMap = (Map<String, Object>) oAuth2User.getAttributes().get("response");

                LogUtil.info("responseMap: {}", responseMap);

                user.setEmail((String) responseMap.get("email"));
                user.setType(LoginType.NAVER);
            }

            user = userRepository.save(user);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return new CustomOAuth2User(user.getUserId());
    }

}

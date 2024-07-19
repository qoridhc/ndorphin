package com.web.ndolphin.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.ndolphin.domain.CustomOAuth2User;
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

@Service
@RequiredArgsConstructor
@Slf4j
public class OAuth2UserServiceImpl extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {

        LogUtil.debug("OAuth2UserServiceImpl", request,toString());
        LogUtil.info("OAuth2UserServiceImpl", request,toString());

        log.debug("OAuth2UserServiceImpl - loa1dUser", request);

        OAuth2User oAuth2User = super.loadUser(request);
        String oauthClientName = request.getClientRegistration().getClientName(); // 어떤 OAuth 요청인지 naver, kakao...

        try {

            Map<String, String> responseMap = (Map<String, String>) oAuth2User.getAttributes().get("response");
//            log.debug("responseMap: {}", responseMap);

//            System.out.println(new ObjectMapper().writeValueAsString(oAuth2User.getAttributes()));
        } catch (Exception e) {
            e.printStackTrace();
        }

        User user = new User();
        String email = "email@email.com";

        if (oauthClientName.equals("kakao")) {
            user.setEmail(email);
            user.setType(0);
        }

//        if (oauthClientName.equals("naver")) {
//            Map<String, String> responseMap = (Map<String, String>) oAuth2User.getAttributes().get("response");
//            userId = "naver_" + responseMap.get("id").substring(0, 14);
//            email = responseMap.get("email");
//            userEntity = new UserEntity(userId, email,"naver");
//        }

        userRepository.save(user);

        return new CustomOAuth2User(email);
    }

}

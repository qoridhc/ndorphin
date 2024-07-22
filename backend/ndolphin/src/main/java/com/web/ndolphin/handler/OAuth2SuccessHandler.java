package com.web.ndolphin.handler;

import com.web.ndolphin.domain.CustomOAuth2User;
import com.web.ndolphin.provider.JwtProvider;
import com.web.ndolphin.util.LogUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    // OAuth2UserServiceImpl에서 성공적으로 CustomOAuth2User를 반환하면 메서드 실행
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        LogUtil.info("oAuth2User", oAuth2User);

        String userId = oAuth2User.getName();

//        response.sendRedirect("http://localhost:3000/auth/oauth-response/" + token + "/3600");
//        response.sendRedirect("http://localhost:8000/api/v1/auth/test");

        String redirectUrl = "http://localhost:8080/api/v1/auth/oauth-response/" + userId;
        getRedirectStrategy().sendRedirect(request, response,redirectUrl);
    }
}

package com.web.ndolphin.handler;

import com.web.ndolphin.domain.CustomOAuth2User;
import com.web.ndolphin.util.LogUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    // OAuth2UserServiceImpl에서 성공적으로 CustomOAuth2User를 반환하면 메서드 실행
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
        Authentication authentication) throws IOException, ServletException {
        LogUtil.info("authentication.getPrincipal()", authentication.getPrincipal());

        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        LogUtil.info("oAuth2User", oAuth2User);

        String userId = oAuth2User.getName();

//        response.sendRedirect("http://localhost:3000/auth/oauth-response/" + token + "/3600");
//        response.sendRedirect("http://localhost:8000/api/v1/auth/test");

        // OAuth2 로그인 성공하면 컨트롤러로 redirect
        String redirectUrl =
            "http://ec2-54-180-146-64.ap-northeast-2.compute.amazonaws.com:8080/api/v1/auth/oauth-response/" + userId;

        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}

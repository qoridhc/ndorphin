package com.web.ndolphin.handler;

import com.web.ndolphin.domain.CustomOAuth2User;
import com.web.ndolphin.domain.Token;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.repository.TokenRepository;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.util.LogUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;

    // OAuth2UserServiceImpl에서 성공적으로 CustomOAuth2User를 반환하면 메서드 실행
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
        Authentication authentication) throws IOException, ServletException {
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        String userId = oAuth2User.getName();

        LogUtil.info("onAuthenticationSuccess", userId);

        User user = null;

        try {
            user = userRepository.findByUserId(Long.valueOf(userId));

            Token token = tokenRepository.findByUserId(Long.valueOf(userId));
//
//            // userId 쿠키 설정
//            Cookie userIdCookie = new Cookie("userId", userId);
//            userIdCookie.setMaxAge(3600); // 1시간 유효
//            userIdCookie.setPath("/"); // 모든 경로에서 접근 가능
//
//            // accessToken 쿠키 설정
//            Cookie jwtCookie = new Cookie("accessToken", token.getAccessToken());
//            jwtCookie.setMaxAge(3600); // 1시간 유효
//            jwtCookie.setPath("/"); // 모든 경로에서 접근 가능
//
//            // refreshToken 쿠키 설정
//            Cookie refreshTokenCookie = new Cookie("refreshToken", token.getRefreshToken());
//            refreshTokenCookie.setMaxAge(3600); // 1시간 유효
//            refreshTokenCookie.setPath("/"); // 모든 경로에서 접근 가능
//
//            String isNewUser = user.getNickName() == null ? "true" : "false";
//
//            Cookie isNewUserCookie = new Cookie("isNewUser", isNewUser);
//
//            LogUtil.info("isNewUserCookie", isNewUserCookie);
//
//            isNewUserCookie.setMaxAge(3600);
//            isNewUserCookie.setPath("/");
//
//            // 쿠키를 응답에 추가
//            response.addCookie(userIdCookie);
//            response.addCookie(jwtCookie);
//            response.addCookie(refreshTokenCookie);

            String accessToken = token.getAccessToken();
            String refreshToken = token.getRefreshToken();
            String isNewUser = user.getNickName() == null ? "true" : "false";

            // 인증 성공 후 리디렉션할 URL 생성
            String targetUrl = "http://localhost:3000"; // 여기서 '/'를 추가할 필요 없음
            targetUrl += "?userId=" + URLEncoder.encode(userId, "UTF-8");
            targetUrl += "&accessToken=" + URLEncoder.encode(accessToken, "UTF-8");
            targetUrl += "&refreshToken=" + URLEncoder.encode(refreshToken, "UTF-8");
            targetUrl += "&isNewUser=" + URLEncoder.encode(isNewUser, "UTF-8");

            // URL 출력 (디버깅용)
            System.out.println("Redirecting to: " + targetUrl);

            setDefaultTargetUrl(targetUrl); // defaultTargetUrl 설정

            // 리다이렉트
            response.sendRedirect(targetUrl);
//            response.sendRedirect("http://ec2-54-180-146-64.ap-northeast-2.compute.amazonaws.com:80

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

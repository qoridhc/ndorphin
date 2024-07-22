package com.web.ndolphin.config;

import com.web.ndolphin.filter.JwtAutheticationFilter;
import com.web.ndolphin.handler.OAuth2SuccessHandler;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.io.IOException;

@Configurable
@Configuration // Spring의 Configuration 클래스를 정의
@EnableWebSecurity // Spring Security를 활성화
@RequiredArgsConstructor // final 필드에 대한 생성자를 자동으로 생성
public class WebSecurityConfig {

    private final JwtAutheticationFilter jwtAutheticationFilter; // JwtAutheticationFilter를 주입받음
    private final DefaultOAuth2UserService oAuth2UserService;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;

    @Bean
    protected SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception {

        httpSecurity.cors(cors -> cors.configurationSource(corsConfigurationSource())) // CORS 설정
                .csrf(CsrfConfigurer::disable) // CSRF 보호 비활성화
                .httpBasic(httpBasicCustomizer -> httpBasicCustomizer.disable()) // 기본 인증 방식 (Basic Auth) 비활성화 -> Bearer 인증 방식을 사용하기 위해
                .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 세션 관리 정책을 무상태로 설정
                .authorizeHttpRequests(request -> request
                                .requestMatchers("/api/v1/user/*").authenticated()
                                .requestMatchers("/api/v1/auth/token/reissue").permitAll()
                                .requestMatchers("/", "/api/v1/auth/**", "/oauth2/**", "/swagger-ui/**", "/error").permitAll() // 이 경로는 인증 없이 접근 허용

//                        .authorizeHttpRequests(request -> request
//                                .requestMatchers("api/v1.**", "/error", "/**").permitAll()
//                                .anyRequest().permitAll() // 일단 모든 권한 허용 -> 추후 유저 권한 구현 완료 시 변경

//                        .requestMatchers("/", "/api/v1/auth/**", "/oauth2/**").permitAll() // 이 경로는 인증 없이 접근 허용
//                        .requestMatchers("/api/v1/user/**").hasRole("USER") // 이 경로는 ROLE_USER 권한이 있어야 접근 가능
//                        .requestMatchers("/api/v1/admin/**").hasRole("ADMIN") // 이 경로는 ROLE_ADMIN 권한이 있어야 접근 가능
//                        .anyRequest().authenticated() // 나머지 모든 요청은 인증해야 접근 가능
//
                ).oauth2Login(oauth2 -> oauth2
                        .authorizationEndpoint(endPoint -> endPoint.baseUri("/api/v1/auth/oauth2"))
                        .redirectionEndpoint(endpoint -> endpoint.baseUri("/oauth2/callback/*"))
                        .userInfoEndpoint(endpoint -> endpoint.userService(oAuth2UserService))
                        .successHandler(oAuth2SuccessHandler)
                )
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .authenticationEntryPoint(new FailedAuthenticatoinEntryPoint()) // 인증 실패 시 처리할 엔트리 포인트 설정
                ).addFilterBefore(jwtAutheticationFilter, UsernamePasswordAuthenticationFilter.class); // JWT 인증 필터를 UsernamePasswordAuthenticationFilter 앞에 추가

        return httpSecurity.build(); // 설정을 기반으로 SecurityFilterChain 빌드
    }

    @Bean
    protected CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOrigin("*"); // 모든 오리진 허용
        corsConfiguration.addAllowedMethod("*"); // 모든 메소드 허용
        corsConfiguration.addAllowedHeader("*"); // 모든 헤더 허용

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration); // 모든 경로에 CORS 설정 적용

        return source; // CORS 설정 소스 반환
    }
}

// 인증 실패 시 처리할 엔트리 포인트
class FailedAuthenticatoinEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        response.setContentType("application/json"); // 응답 콘텐츠 타입을 JSON으로 설정
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 응답 상태 코드를 401으로 설정
        response.getWriter().write("{\"code\" : \"UA\", \"message\" : \"UnAuthorized.\"}"); // 응답 바디에 JSON 형태로 메시지 작성

    }
}
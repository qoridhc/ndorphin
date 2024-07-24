package com.web.ndolphin.filter;

import com.web.ndolphin.domain.User;
import com.web.ndolphin.provider.JwtProvider;
import com.web.ndolphin.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@RequiredArgsConstructor
public class JwtAutheticationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {

        try {
            // 요청에서 Bearer 토큰을 파싱
            String token = parseBearerToken(request);

            // 토큰이 없으면 다음 필터로 넘어감
            if (token == null) {
                filterChain.doFilter(request, response);
                return;
            }

            // JWT 유효성 검증
            String userId = jwtProvider.validate(token);

            // 유효하지 않은 토큰이면 다음 필터로 넘어감
            if (userId == null) {
                filterChain.doFilter(request, response);
                return;
            }

            // 유효한 토큰에서 추출한 사용자 ID로 사용자 정보 조회
            User user = userRepository.findByUserId(Long.valueOf(userId));
            String role = String.valueOf(user.getRole()); // role : ROLE_USER, ROLE_ADMIN

            // 사용자 역할을 GrantedAuthority 리스트(여러개 role 가질수도 있으므로)에 추가
            // ROLE_DEVELOPER, ROLE_MASTER ... 규칙 따라 role 규정
            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(role));

            // 새로운 SecurityContext 생성
            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
            // 사용자 ID와 권한으로 UsernamePasswordAuthenticationToken 생성
            AbstractAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userId, null, authorities);

            // 요청의 세부 정보를 설정
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            // SecurityContext에 인증 토큰 설정
            securityContext.setAuthentication(authenticationToken);
            // SecurityContextHolder에 SecurityContext 설정
            SecurityContextHolder.setContext(securityContext);

        } catch (Exception e) {
//            e.printStackTrace();
        }

        filterChain.doFilter(request, response);
    }

    private String parseBearerToken(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");

        // 실제 값이 있는지 검증 -> null, 길이 0, 공백으로만 : false , 아니면 true
        boolean hasAuthorization = StringUtils.hasText(authorization);

        if (!hasAuthorization) {
            return null;
        }

        // 문자열이 'Bearer ' 로 시작되는지 체크 -> 정상적인 Bearer 토큰인지 검증
        boolean isBearer = authorization.startsWith("Bearer ");

        if (!isBearer) {
            return null;
        }

        String token = authorization.substring(7);
        
        return token;
    }

}

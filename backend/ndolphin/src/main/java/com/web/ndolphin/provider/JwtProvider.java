package com.web.ndolphin.provider;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Component
public class JwtProvider {

    @Value("${jwt.secret-key}")
    private String secretKey;

    // JWT 생성 -> userId를 받아 JWT 토큰을 생성
    public String create(String userId) {
        // 만료시간 -> 현재시간 + 1시간뒤
        Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));

        // HMAC SHA 알고리즘을 사용하기 위해 바이트 배열로 변환하여 키 객체 생성
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        // 빌더로 JWT 생성
        String jwt = Jwts.builder()
                .signWith(key, SignatureAlgorithm.HS256) // 암호화 알고리즘
                .setSubject(userId) // 토큰의 subject 필드에 사용자 ID 설정
                .setIssuedAt(new Date()) // 토큰 발생 시간
                .setExpiration(expiredDate) // 토큰 만료 시간
                .compact(); // 토큰을 압축하여 문자열로 반환

        return jwt;
    }

    // Jwt 유효성 검증 -> JWT 토큰을 입력받아 검증하고  userId를 반환
    public String validate(String jwt) {
        String subject = null;

        // 비밀키를 바이트 배열로 변환하여 키 객체 생성
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        try {
            // JWT 파서 빌더를 사용하여 JWT를 파싱하고 서명 키 설정
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key) // 서명 키 설정
                    .build() // 빌더 빌드
                    .parseClaimsJws(jwt) // JWT 파싱 및 검증
                    .getBody(); // JWT의 본문(Claims) 추출

            subject = claims.getSubject(); // Claims에서 subject(userId) 추출
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return subject;
    }


}

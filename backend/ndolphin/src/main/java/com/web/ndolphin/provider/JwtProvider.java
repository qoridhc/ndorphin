package com.web.ndolphin.provider;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtProvider {

  @Value("${jwt.secret-key}")
  private String secretKey;

  // HMAC SHA 알고리즘을 사용하기 위해 바이트 배열로 변환하여 키 객체 생성
  private Key getKey() {
    return Keys.hmacShaKeyFor(secretKey.getBytes());
  }

  // JWT AccessToken 생성 -> userId를 받아 JWT 토큰을 생성
  public String generateAccessToken(String userId) {
    // 만료시간 일단 개발용으로 한달 설정 -> 추후 변경
//        Date expiredDate = Date.from(Instant.now().plus(30, ChronoUnit.MINUTES));
    Date expiredDate = Date.from(Instant.now().plus(30, ChronoUnit.DAYS));

    // 빌더로 JWT 생성
    String jwt = Jwts.builder()
        .signWith(getKey(), SignatureAlgorithm.HS256) // 암호화 알고리즘
        .setSubject(userId) // 토큰의 subject 필드에 사용자 ID 설정
        .setIssuedAt(new Date()) // 토큰 발생 시간
        .setExpiration(expiredDate) // 토큰 만료 시간
        .compact(); // 토큰을 압축하여 문자열로 반환

    return jwt;
  }

  // RefreshToken 생성 -> 만료 시간 일주일
  public String generagteRefreshToken(String userId) {
    // 만료시간 -> 현재시간 + 1시간뒤
    Date expiredDate = Date.from(Instant.now().plus(7, ChronoUnit.DAYS));

    // 빌더로 JWT 생성
    String jwt = Jwts.builder()
        .signWith(getKey(), SignatureAlgorithm.HS256) // 암호화 알고리즘
        .setSubject(userId) // 토큰의 subject 필드에 사용자 ID 설정
        .setIssuedAt(new Date()) // 토큰 발생 시간
        .setExpiration(expiredDate) // 토큰 만료 시간
        .compact(); // 토큰을 압축하여 문자열로 반환

    return jwt;
  }

  // Jwt 유효성 검증 (서명 유효성, 조작 검사, 만료 검사) -> JWT 토큰을 입력받아 검증하고  userId를 반환
  public String validate(String jwt) {
    String subject = null;

    try {
      // JWT 파서 빌더를 사용하여 JWT를 파싱하고 서명 키 설정
      Claims claims = Jwts.parserBuilder()
          .setSigningKey(getKey()) // 서명 키 설정
          .build() // 빌더 빌드
          .parseClaimsJws(jwt) // JWT 파싱 및 검증
          .getBody(); // JWT의 본문(Claims) 추출

      subject = claims.getSubject(); // Claims에서 subject(userId) 추출
    } catch (Exception e) {
//            e.printStackTrace();
      return null;
    }

    return subject;
  }


}

package com.web.ndolphin.domain;

import lombok.ToString;

@ToString
public enum LoginType {
    KAKAO("KAKAO"),
    GOOGLE("GOOGLE"),
    NAVER("NAVER");

    private final String value;

    // 생성자
    LoginType(String value) {
        this.value = value;
    }

}

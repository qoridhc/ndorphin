package com.web.ndolphin.dto.auth.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignUpRequestDto {

    @NotBlank
    @Email
    private String email;

    /**
     * password validateion 패턴 지정
     * 하나 이상의 영문자(대문자도 가능)와 숫자로 구성
     * 8 ~ 15자 글자수 제한
     * 공백 불가능
     * 특수문자는 필수
     */

    @NotBlank
    @Pattern(regexp = "^(?=.*[a-zA-Z\\d])(?=.*[!@#$%^&*(),.?\":{}|<>])(?!.*\\s).{8,15}$")
    private String password;

    @NotBlank
    private String certificationNumber;
}

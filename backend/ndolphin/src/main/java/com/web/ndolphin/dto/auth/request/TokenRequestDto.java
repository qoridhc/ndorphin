package com.web.ndolphin.dto.auth.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class TokenRequestDto {

    @NotBlank(message = "유효하지않은 refreshToken 값입니다.")
    private String refreshToken;
}

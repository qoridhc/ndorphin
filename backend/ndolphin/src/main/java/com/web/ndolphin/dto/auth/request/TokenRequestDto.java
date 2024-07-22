package com.web.ndolphin.dto.auth.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class TokenRequestDto {
    private String refreshToken;
}

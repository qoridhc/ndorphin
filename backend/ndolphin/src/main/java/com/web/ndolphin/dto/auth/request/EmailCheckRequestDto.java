package com.web.ndolphin.dto.auth.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class EmailCheckRequestDto {

    @NotBlank(message = "이메일 입력은 필수입니다.")
    private String email;

}

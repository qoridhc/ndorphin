package com.web.ndolphin.dto.user.request;

import com.web.ndolphin.domain.RoleType;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateRequestDto {

    private String profileImage;

    @Pattern(regexp = "^[\\S]{2,10}$", message = "닉네임은 공백 없이 2글자에서 10글자 사이여야 합니다.")
    private String nickName;

    private String mbti;

    private Long nPoint;

    private RoleType role;
}

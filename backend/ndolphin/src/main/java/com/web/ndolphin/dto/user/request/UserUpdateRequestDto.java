package com.web.ndolphin.dto.user.request;

import com.web.ndolphin.domain.RoleType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateRequestDto {

    private String email;

    private String profileImage;

    private String nickName;

    private String mbti;

    private Long nPoint;

    private RoleType role;
}

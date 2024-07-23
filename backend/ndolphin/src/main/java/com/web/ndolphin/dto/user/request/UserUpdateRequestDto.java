package com.web.ndolphin.dto.user.request;

import com.web.ndolphin.domain.LoginType;
import com.web.ndolphin.domain.RoleType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UserUpdateRequestDto {
    private String email;

    private String profileImage;

    private String nickName;

    private String mbti;

    private Integer nPoint;

    private RoleType role;
}

package com.web.ndolphin.dto.user;

import com.web.ndolphin.domain.LoginType;
import com.web.ndolphin.domain.RoleType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UserDto {
    private Long userId;

    private String email;

    private String profileImage;

    private String nickName;

    private String mbti;

    private int nPoint;

    private LoginType type;

    private RoleType role;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private LocalDateTime nickNameUpdatedAt;
}

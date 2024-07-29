package com.web.ndolphin.dto.user;

import com.web.ndolphin.domain.LoginType;
import com.web.ndolphin.domain.RoleType;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {

    private Long userId;

    private String email;

    private String profileImage;

    private String nickName;

    private String mbti;

    private Long nPoint;

    private LoginType type;

    private RoleType role;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private LocalDateTime nickNameUpdatedAt;
}

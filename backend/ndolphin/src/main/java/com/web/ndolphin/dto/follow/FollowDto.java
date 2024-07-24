package com.web.ndolphin.dto.follow;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class FollowDto {

    private Long followId;

    private Long followerId;

    private Long followingId;

    private LocalDateTime createdAt;
}

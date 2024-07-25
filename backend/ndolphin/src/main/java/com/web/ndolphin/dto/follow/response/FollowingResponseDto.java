package com.web.ndolphin.dto.follow.response;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class FollowingResponseDto {

    private Long followId;

    private Long followingId;

    private LocalDateTime createdAt;

}

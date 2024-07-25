package com.web.ndolphin.dto.follow.response;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class FollowerReponseDto {

    private Long followId;

    private Long followerId;

    private LocalDateTime createdAt;
}

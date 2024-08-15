package com.web.ndolphin.dto.follow.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class FollowRequestDto {

    @NotNull(message = "followingId가 null 입니다.")
    private Long followingId;

}

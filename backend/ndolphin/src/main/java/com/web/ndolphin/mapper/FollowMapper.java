package com.web.ndolphin.mapper;

import com.web.ndolphin.domain.Follow;
import com.web.ndolphin.dto.follow.FollowDto;

public class FollowMapper {

    public static FollowDto toDto(Follow follow) {

        FollowDto dto = new FollowDto();

        dto.setFollowId(follow.getId());
        dto.setFollowerId(follow.getFollower().getUserId());
        dto.setFollowingId(follow.getFollowing().getUserId());
        dto.setCreatedAt(follow.getCreatedAt());

        return dto;
    }
}

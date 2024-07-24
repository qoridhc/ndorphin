package com.web.ndolphin.mapper;

import com.web.ndolphin.domain.Follow;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.follow.FollowDto;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class FollowMapper {

    public static Follow toEntity(User followBy, User followTo) {

        Follow follow = new Follow();

        follow.setFollower(followBy);
        follow.setFollowing(followTo);
        follow.setCreatedAt(LocalDateTime.now());

        return follow;
    }

    public static FollowDto toDto(Follow follow) {

        FollowDto dto = new FollowDto();

        dto.setFollowId(follow.getId());
        dto.setFollowerId(follow.getFollower().getUserId());
        dto.setFollowingId(follow.getFollowing().getUserId());
        dto.setCreatedAt(follow.getCreatedAt());

        return dto;
    }

    public static List<FollowDto> toDtoList(List<Follow> followDtos) {
        return followDtos.stream()
            .map(FollowMapper::toDto)
            .collect(Collectors.toList());
    }
}

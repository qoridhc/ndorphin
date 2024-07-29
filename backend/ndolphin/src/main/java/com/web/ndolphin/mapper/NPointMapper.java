package com.web.ndolphin.mapper;

import com.web.ndolphin.domain.NPoint;
import com.web.ndolphin.domain.PointRule;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.npoint.resopnse.NPointResponseDto;

public class NPointMapper {

    public static NPoint toEntity(User user, PointRule pointRule) {

        NPoint nPoint = new NPoint();

        nPoint.setUser(user);
        nPoint.setPointRule(pointRule);

        return nPoint;
    }

    public static NPointResponseDto toNPointResponseDto(Long userId, Long nPoint) {

        NPointResponseDto nPointResponseDto = new NPointResponseDto();

        nPointResponseDto.setUserId(userId);
        nPointResponseDto.setNPoint(nPoint);

        return nPointResponseDto;
    }

}

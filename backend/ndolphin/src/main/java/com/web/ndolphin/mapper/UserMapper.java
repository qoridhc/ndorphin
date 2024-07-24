package com.web.ndolphin.mapper;

import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.user.UserDto;

public class UserMapper {

    public static UserDto toDto(User user) {
        UserDto userDto = new UserDto();

        userDto.setUserId(user.getUserId());
        userDto.setEmail(user.getEmail());
        userDto.setProfileImage(user.getProfileImage());
        userDto.setNickName(user.getNickName());
        userDto.setMbti(user.getMbti());
        userDto.setType(user.getType());
        userDto.setNPoint(user.getNPoint());
        userDto.setUpdatedAt(user.getUpdatedAt());
        userDto.setNickNameUpdatedAt(user.getNickNameUpdatedAt());
        userDto.setRole(user.getRole());
        userDto.setCreatedAt(user.getCreatedAt());

        return userDto;
    }

}

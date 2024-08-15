package com.web.ndolphin.mapper;

import com.web.ndolphin.domain.Notification;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.notification.request.NotificationRequestDto;
import com.web.ndolphin.dto.notification.response.NotificationResponseDto;
import com.web.ndolphin.dto.user.response.WriterResponseDto;
import java.util.List;
import java.util.stream.Collectors;

public class NotificationMapper {

    public static NotificationResponseDto toDto(Notification notification) {

        NotificationResponseDto dto = new NotificationResponseDto();

        dto.setContent(notification.getContent());
        dto.setRead(true);
        dto.setCreatedAt(notification.getCreatedAt());
        dto.setNotificationId(notification.getId());
        dto.setUserId(notification.getUser().getUserId());

        WriterResponseDto writer = toWriterDto(notification.getWriter());

        dto.setUser(writer);

        return dto;
    }

    public static WriterResponseDto toWriterDto(User user) {

        WriterResponseDto writerDto = new WriterResponseDto();

        writerDto.setUserId(user.getUserId());
        writerDto.setNickName(user.getNickName());
        writerDto.setProfileImage(user.getProfileImage());
        writerDto.setMbti(user.getMbti());

        return writerDto;
    }

    public static Notification toEntity(User user, User writer, NotificationRequestDto requestDto) {

        Notification notification = new Notification();

        notification.setUser(user);
        notification.setContent(requestDto.getContent());
        notification.setWriter(writer);
        notification.setRead(false);

        return notification;
    }

    public static List<NotificationResponseDto> toDtoList(List<Notification> notifications) {
        return notifications.stream()
            .map(NotificationMapper::toDto)
            .collect(Collectors.toList());
    }

}

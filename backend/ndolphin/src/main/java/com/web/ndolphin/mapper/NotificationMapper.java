package com.web.ndolphin.mapper;

import com.web.ndolphin.domain.Notification;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.notification.request.NotificationRequestDto;
import com.web.ndolphin.dto.notification.response.NotificationResponseDto;
import java.time.LocalDateTime;
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

        return dto;
    }

    public static Notification toEntity(User user, NotificationRequestDto requestDto) {

        Notification notification = new Notification();

        notification.setUser(user);
        notification.setContent(requestDto.getContent());
        notification.setCreatedAt(LocalDateTime.now());
        notification.setRead(false);

        return notification;
    }


    public static List<NotificationResponseDto> toDtoList(List<Notification> notifications) {
        return notifications.stream()
            .map(NotificationMapper::toDto)
            .collect(Collectors.toList());
    }

}

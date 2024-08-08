package com.web.ndolphin.dto.notification.response;

import com.web.ndolphin.dto.user.response.WriterResponseDto;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@NoArgsConstructor
public class NotificationResponseDto {

    private Long notificationId;
    private Long userId;
    private String content;
    private LocalDateTime createdAt;
    private boolean isRead;

    WriterResponseDto user;
}

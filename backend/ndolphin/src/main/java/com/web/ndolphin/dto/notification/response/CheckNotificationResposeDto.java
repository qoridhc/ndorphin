package com.web.ndolphin.dto.notification.response;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@AllArgsConstructor
public class CheckNotificationResposeDto {

    private boolean hasUnreadNotification;
}

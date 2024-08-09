package com.web.ndolphin.dto.notification.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class NotificationRequestDto {

    @NotBlank(message = "알림 내용은 필수입니다.")
    private String content;

    @NotNull(message = "알림 생성자(작성자) 아이디는 필수입니다.")
    private Long writerId;

}

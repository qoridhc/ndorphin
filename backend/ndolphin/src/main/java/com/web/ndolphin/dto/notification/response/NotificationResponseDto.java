package com.web.ndolphin.dto.notification.response;

import com.web.ndolphin.common.ResponseCode;
import com.web.ndolphin.common.ResponseMessage;
import com.web.ndolphin.domain.Notification;
import com.web.ndolphin.dto.ResponseDto;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@ToString
@Getter
@Setter
public class NotificationResponseDto {

  private Long id;
  private String content;
  private LocalDateTime createdAt;
  private boolean isRead;

  public NotificationResponseDto(Notification notification) {
    this.id = notification.getId();
    this.content = notification.getContent();
    this.createdAt = notification.getCreatedAt();
    this.isRead = notification.isRead();
  }

  public static ResponseEntity<ResponseDto> success(List<NotificationResponseDto> dto) {

    ResponseDto<List<NotificationResponseDto>> responseBody = new ResponseDto(ResponseCode.SUCCESS,
        ResponseMessage.SUCCESS, dto);

    return ResponseEntity.status(HttpStatus.OK).body(responseBody);
  }
}

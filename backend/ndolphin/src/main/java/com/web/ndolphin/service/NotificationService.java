package com.web.ndolphin.service;

import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.notification.request.NotificationRequestDto;
import org.springframework.http.ResponseEntity;

public interface NotificationService {

  ResponseEntity<ResponseDto> create(Long userId, NotificationRequestDto dto);

  ResponseEntity<ResponseDto> selectAllByUserId(Long userId);

}

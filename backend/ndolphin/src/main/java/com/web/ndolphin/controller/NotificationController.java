package com.web.ndolphin.controller;

import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.notification.request.NotificationRequestDto;
import com.web.ndolphin.service.impl.NotificationServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/notification")
@RequiredArgsConstructor
public class NotificationController {

  private final NotificationServiceImpl notificationService;

  @PostMapping("/{userId}")
  public ResponseEntity<ResponseDto> createNotification(
      @PathVariable Long userId,
      @RequestBody NotificationRequestDto dto
  ) {

    ResponseEntity<ResponseDto> response = notificationService.create(userId, dto);

    return response;
  }

  @GetMapping("/{userId}")
  public ResponseEntity<ResponseDto> getAllNotification(@PathVariable Long userId) {

    ResponseEntity<ResponseDto> response = notificationService.selectAllByUserId(userId);

    return response;
  }

  @DeleteMapping("/{notificationId}")
  public ResponseEntity<ResponseDto> deleteNotification(@PathVariable Long notificationId) {

    ResponseEntity<ResponseDto> response = notificationService.delete(notificationId);

    return response;
  }

}

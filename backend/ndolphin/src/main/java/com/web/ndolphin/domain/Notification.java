package com.web.ndolphin.domain;

import com.web.ndolphin.dto.notification.request.NotificationRequestDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Notification {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "notification_id")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  private String content;
  private LocalDateTime createdAt;
  private boolean isRead;

  public Notification(User user, NotificationRequestDto dto) {
    this.user = user;
    this.content = dto.getContent();
    this.createdAt = LocalDateTime.now();
    this.isRead = false;
  }

}

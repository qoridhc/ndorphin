package com.web.ndolphin.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class BoardResponseDto {
    private Long id;
    private String subject;
    private String content;
    private int hit;
    private String boardType;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long userId;
}
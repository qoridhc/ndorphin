package com.web.ndolphin.dto.board.response;

import com.web.ndolphin.domain.BoardType;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class BoardDto {

    private Long id;
    private Long userId;
    private String nickName;
    private String avatarUrl;
    private String subject;
    private String content;
    private int hit;
    private BoardType boardType;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

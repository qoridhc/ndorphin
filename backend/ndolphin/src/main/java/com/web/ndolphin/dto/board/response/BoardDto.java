package com.web.ndolphin.dto.board.response;

import com.web.ndolphin.domain.BoardType;
import com.web.ndolphin.dto.user.UserDto;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class BoardDto {

    private Long id;
    private UserDto userDto;
    private String subject;
    private String content;
    private int hit;
    private BoardType boardType;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

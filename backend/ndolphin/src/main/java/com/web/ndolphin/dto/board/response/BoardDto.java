package com.web.ndolphin.dto.board.response;

import com.web.ndolphin.domain.BoardType;
import com.web.ndolphin.dto.user.UserDto;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.Data;

@Data
public class BoardDto {

    private Long id;
    private UserDto user;
    private String subject;
    private String content;
    private List<String> fileNames = new ArrayList<>();
    private List<String> fileUrls = new ArrayList<>();
    private int hit;
    private BoardType boardType;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

package com.web.ndolphin.dto.board.response;

import com.web.ndolphin.dto.comment.CommentResponseDto;
import java.time.LocalDateTime;
import java.util.List;

public class BoardUpdateResponseDto {

    private Long id;
    private Long userId;
    private String subject;
    private String content;
    private String summary;
    private int hit;
    private String boardType;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<CommentResponseDto> comments;
}

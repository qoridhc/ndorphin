package com.web.ndolphin.dto.board.request;

import com.web.ndolphin.dto.comment.CommentDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class BoardUpdateRequestDto {
//    private Long id; // x
//    private Long userId; // x

    private String subject;
    private String content;

//    private String summary; // x
//    private int hit;  // x
    private String boardType;

//    private LocalDateTime createdAt; // x
//    private LocalDateTime updatedAt; // x
//    private List<CommentDto> comments; // x
}

package com.web.ndolphin.dto.comment;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CommentRequestDto {

    private Long id;
    private Long boardId;
    private Long userId;
    private String content;
}

package com.web.ndolphin.dto.board.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OpinionBoardResponseDto extends BoardDto {

    private String bestComment = "아직 댓글이 없습니다.";
    private long commentCount = 0L;
}

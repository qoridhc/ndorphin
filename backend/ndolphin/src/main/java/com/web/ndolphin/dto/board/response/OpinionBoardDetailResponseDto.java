package com.web.ndolphin.dto.board.response;

import com.web.ndolphin.dto.comment.CommentResponseDto;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OpinionBoardDetailResponseDto extends BoardDto {

    private int commentCount;
    private boolean hasParticipated;
    private List<CommentResponseDto> commentResponseDtos;
}

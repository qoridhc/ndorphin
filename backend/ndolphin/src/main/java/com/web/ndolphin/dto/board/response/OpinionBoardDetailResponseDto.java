package com.web.ndolphin.dto.board.response;

import com.web.ndolphin.dto.comment.CommentResponseDto;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OpinionBoardDetailResponseDto extends BoardDto {

    private String avatarUrl;
    private String contentFileUrl;
    private int commentCount;
    private boolean hasParticipated;
    private List<CommentResponseDto> commentResponseDtos;
}

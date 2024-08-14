package com.web.ndolphin.dto.board.response;

import com.web.ndolphin.dto.comment.CommentResponseDto;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OkBoardDto extends BoardDto {

    private Long commentCnt = 0L;
    private List<CommentResponseDto> commentResponseDtos = new ArrayList<>();
}

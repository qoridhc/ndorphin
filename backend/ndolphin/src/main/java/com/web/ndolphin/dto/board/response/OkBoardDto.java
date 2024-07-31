package com.web.ndolphin.dto.board.response;

import com.web.ndolphin.domain.ReactionType;
import com.web.ndolphin.dto.comment.CommentResponseDto;
import com.web.ndolphin.dto.reaction.response.ReactionResponseDto;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OkBoardDto extends BoardDto {

    private List<String> fileNames = new ArrayList<>();
    private List<String> fileUrls = new ArrayList<>();
    private Map<ReactionType, Long> reactionTypeCounts;
    private List<CommentResponseDto> commentResponseDtos = new ArrayList<>();
}

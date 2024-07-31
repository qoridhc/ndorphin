package com.web.ndolphin.dto.board.response;

import com.web.ndolphin.domain.ReactionType;
import com.web.ndolphin.dto.comment.CommentResponseDto;
import com.web.ndolphin.dto.reaction.response.ReactionResponseDto;
import java.util.List;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RelayBoardDetailResponseDto extends BoardDto {

    private String thumbNailUrl;
    private boolean hasParticipated;
    private List<CommentResponseDto> commentResponseDtos;
    private Map<ReactionType, Long> reactionTypeCounts;
    private ReactionResponseDto userReaction;
}

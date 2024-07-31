package com.web.ndolphin.dto.board.response;

import com.web.ndolphin.domain.ReactionType;
import com.web.ndolphin.dto.reaction.response.ReactionSummaryDto;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ByeBoardDto extends BoardDto {

    private Long userReactionId;
    private ReactionType userReactionType;
    private Map<ReactionType, Long> reactionTypeCounts;
}

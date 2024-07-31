package com.web.ndolphin.dto.reaction.response;

import com.web.ndolphin.domain.ReactionType;
import java.util.List;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReactionSummaryDto {

    private List<ReactionResponseDto> reaction;
    private Map<ReactionType, Long> reactionTypeCounts;
}
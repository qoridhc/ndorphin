package com.web.ndolphin.dto.reaction.response;

import com.web.ndolphin.domain.ReactionType;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class ReactionSummaryDto {

    private List<ReactionResponseDto> reactions;
    private Map<ReactionType, Long> reactionTypeCounts;
}
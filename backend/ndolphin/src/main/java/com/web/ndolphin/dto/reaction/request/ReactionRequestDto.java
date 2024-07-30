package com.web.ndolphin.dto.reaction.request;

import com.web.ndolphin.domain.ReactionType;
import lombok.Data;

@Data
public class ReactionRequestDto {

    private ReactionType reactionType;
}

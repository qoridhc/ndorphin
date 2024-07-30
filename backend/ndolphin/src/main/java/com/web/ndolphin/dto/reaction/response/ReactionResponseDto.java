package com.web.ndolphin.dto.reaction.response;

import com.web.ndolphin.domain.ReactionType;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class ReactionResponseDto {

    private Long userId;
    private Long boardId;
    private ReactionType reactionType;
    private LocalDateTime createdAt;
}

package com.web.ndolphin.mapper;

import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.Reaction;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.reaction.request.ReactionRequestDto;
import com.web.ndolphin.dto.reaction.response.ReactionResponseDto;

public class ReactionMapper {

    public static Reaction toEntity(ReactionRequestDto dto, User user, Board board){

        Reaction reaction = new Reaction();
        reaction.setUser(user);
        reaction.setBoard(board);
        reaction.setReactionType(dto.getReactionType());
        return reaction;
    }

    public static ReactionResponseDto toDto(Reaction reaction){

        ReactionResponseDto dto = new ReactionResponseDto();
        dto.setReactionId(reaction.getId());
        dto.setUserId(reaction.getUser().getUserId());
        dto.setBoardId(reaction.getBoard().getId());
        dto.setReactionType(reaction.getReactionType());
        dto.setCreatedAt(reaction.getCreatedAt());
        return dto;
    }
}

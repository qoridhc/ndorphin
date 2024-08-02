package com.web.ndolphin.service.interfaces;

import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.reaction.request.ReactionRequestDto;
import org.springframework.http.ResponseEntity;

public interface ReactionService {

    ResponseEntity<ResponseDto> addReaction(Long boardId,
        ReactionRequestDto reactionRequestDto);

    ResponseEntity<ResponseDto> deleteReaction(Long reactionId);

    ResponseEntity<ResponseDto> updateReaction(Long reactionId,
        ReactionRequestDto reactionRequestDto);
}

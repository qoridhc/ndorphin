package com.web.ndolphin.service.interfaces;

import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.reaction.request.ReactionRequestDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;

public interface ReactionService {

    ResponseEntity<ResponseDto> addReaction(HttpServletRequest request, Long boardId, ReactionRequestDto reactionRequestDto);
    ResponseEntity<ResponseDto> getReactionsByBoardId(Long boardId);
    ResponseEntity<ResponseDto> deleteReaction(HttpServletRequest request, Long reactionId);
    ResponseEntity<ResponseDto> updateReaction(HttpServletRequest request, Long reactionId, ReactionRequestDto reactionRequestDto);
}

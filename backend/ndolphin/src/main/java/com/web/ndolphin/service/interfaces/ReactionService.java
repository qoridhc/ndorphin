package com.web.ndolphin.service.interfaces;

import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.reaction.request.ReactionRequestDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;

public interface ReactionService {

    ResponseEntity<ResponseDto> addReaction(HttpServletRequest request, Long boardId, ReactionRequestDto reactionRequestDto);
    ResponseEntity<ResponseDto> getReactionsByBoardId(Long boardId);
}

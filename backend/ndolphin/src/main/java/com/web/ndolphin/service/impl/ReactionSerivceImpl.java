package com.web.ndolphin.service.impl;

import com.web.ndolphin.common.ResponseCode;
import com.web.ndolphin.common.ResponseMessage;
import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.Reaction;
import com.web.ndolphin.domain.ReactionType;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.reaction.request.ReactionRequestDto;
import com.web.ndolphin.dto.reaction.response.ReactionResponseDto;
import com.web.ndolphin.mapper.ReactionMapper;
import com.web.ndolphin.repository.BoardRepository;
import com.web.ndolphin.repository.ReactionRepository;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.service.interfaces.ReactionService;
import com.web.ndolphin.service.interfaces.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReactionSerivceImpl implements ReactionService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final ReactionRepository reactionRepository;
    private final TokenService tokenService;

    @Override
    @Transactional

    public ResponseEntity<ResponseDto> addReaction(Long boardId,
        ReactionRequestDto reactionRequestDto) {

        try {
            Long userId = tokenService.getUserIdFromToken();

            User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));

            Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid board ID"));

            Reaction reaction = ReactionMapper.toEntity(reactionRequestDto, user, board);
            reactionRepository.save(reaction);

            ReactionResponseDto reactionResponseDto = ReactionMapper.toDto(reaction);

            ResponseDto<ReactionResponseDto> responseDto = new ResponseDto<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                reactionResponseDto
            );
            return ResponseEntity.status(HttpStatus.OK).body(responseDto);
        } catch (Exception e) {
            return ResponseDto.databaseError(e.getMessage()); // 예외 발생 시 데이터베이스 에러 응답
        }
    }

    @Override
    @Transactional
    public ResponseEntity<ResponseDto> deleteReaction(Long reactionId) {

        try {
            Long userId = tokenService.getUserIdFromToken();

            Reaction existingReaction = reactionRepository.findById(reactionId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid reaction ID"));

            reactionRepository.delete(existingReaction);

            return ResponseDto.success();
        } catch (Exception e) {
            return ResponseDto.databaseError(e.getMessage());
        }
    }

    @Override
    @Transactional
    public ResponseEntity<ResponseDto> updateReaction(Long reactionId,
        ReactionRequestDto reactionRequestDto) {
        try {
            Long userId = tokenService.getUserIdFromToken();

            User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));

            Reaction existingReaction = reactionRepository.findById(reactionId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid reaction ID"));

            existingReaction.setReactionType(
                ReactionType.valueOf(String.valueOf(reactionRequestDto.getReactionType())));
            reactionRepository.save(existingReaction);

            ReactionResponseDto reactionResponseDto = ReactionMapper.toDto(existingReaction);

            ResponseDto<ReactionResponseDto> responseDto = new ResponseDto<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                reactionResponseDto
            );

            return ResponseEntity.status(HttpStatus.OK).body(responseDto);
        } catch (Exception e) {
            return ResponseDto.databaseError(e.getMessage());
        }
    }
}

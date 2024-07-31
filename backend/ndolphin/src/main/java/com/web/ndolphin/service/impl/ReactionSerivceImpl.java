package com.web.ndolphin.service.impl;

import com.web.ndolphin.common.ResponseCode;
import com.web.ndolphin.common.ResponseMessage;
import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.Comment;
import com.web.ndolphin.domain.EntityType;
import com.web.ndolphin.domain.Reaction;
import com.web.ndolphin.domain.ReactionType;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.comment.CommentRequestDto;
import com.web.ndolphin.dto.reaction.request.ReactionRequestDto;
import com.web.ndolphin.dto.reaction.response.ReactionResponseDto;
import com.web.ndolphin.dto.reaction.response.ReactionSummaryDto;
import com.web.ndolphin.mapper.CommentMapper;
import com.web.ndolphin.mapper.ReactionMapper;
import com.web.ndolphin.repository.BoardRepository;
import com.web.ndolphin.repository.ReactionRepository;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.service.interfaces.ReactionService;
import com.web.ndolphin.service.interfaces.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ReactionSerivceImpl implements ReactionService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final ReactionRepository reactionRepository;
    private final TokenService tokenService;

    @Override
    @Transactional
    public ResponseEntity<ResponseDto> addReaction(HttpServletRequest request, Long boardId, ReactionRequestDto reactionRequestDto) {

        try {
            Long userId = tokenService.getUserIdFromToken(request);

            User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));

            Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid board ID"));

            Reaction reaction = ReactionMapper.toEntity(reactionRequestDto, user, board);
            reaction.setCreatedAt(LocalDateTime.now());
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
    @Transactional(readOnly = true)
    public ResponseEntity<ResponseDto> getReactionsByBoardId(Long boardId) {

        try {
            List<Reaction> reactions = reactionRepository.findByBoardId(boardId);

            // 각 ReactionType별 개수 취합
            Map<ReactionType, Long> reactionTypeCounts = reactions.stream()
                .collect(Collectors.groupingBy(Reaction::getReactionType, Collectors.counting()));

            List<ReactionResponseDto> reactionResponseDtos = reactions.stream()
                .map(ReactionMapper::toDto)
                .collect(Collectors.toList());

            ReactionSummaryDto reactionSummaryDto = new ReactionSummaryDto();
            reactionSummaryDto.setReactions(reactionResponseDtos);
            reactionSummaryDto.setReactionTypeCounts(reactionTypeCounts);

            ResponseDto<ReactionSummaryDto> responseDto = new ResponseDto<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                reactionSummaryDto
            );

            return ResponseEntity.status(HttpStatus.OK).body(responseDto);
        } catch (Exception e) {
            return ResponseDto.databaseError();
        }
    }

    @Override
    @Transactional
    public ResponseEntity<ResponseDto> deleteReaction(HttpServletRequest request, Long reactionId) {

        try {
            Long userId = tokenService.getUserIdFromToken(request);

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
    public ResponseEntity<ResponseDto> updateReaction(HttpServletRequest request, Long reactionId, ReactionRequestDto reactionRequestDto) {
        try {
            Long userId = tokenService.getUserIdFromToken(request);

            User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));

            Reaction existingReaction = reactionRepository.findById(reactionId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid reaction ID"));

            existingReaction.setReactionType(ReactionType.valueOf(String.valueOf(reactionRequestDto.getReactionType())));
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

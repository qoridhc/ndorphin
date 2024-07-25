package com.web.ndolphin.service.impl;

import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.Comment;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.comment.CommentRequestDto;
import com.web.ndolphin.mapper.CommentMapper;
import com.web.ndolphin.repository.BoardRepository;
import com.web.ndolphin.repository.CommentRepository;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.service.interfaces.CommentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;

    @Override
    public ResponseEntity<ResponseDto> addComment(Long boardId,
        CommentRequestDto commentRequestDto) {

        try {
            User user = userRepository.findById(commentRequestDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
            Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid board ID"));

            Comment comment = CommentMapper.toEntity(commentRequestDto, user, board);

            commentRepository.save(comment);

            return ResponseDto.success(); // 성공 시 응답
        } catch (Exception e) {
            return ResponseDto.databaseError(e.getMessage()); // 예외 발생 시 데이터베이스 에러 응답
        }
    }

    @Override
    @Transactional
    public ResponseEntity<ResponseDto> updateComment(Long commentId,
        CommentRequestDto commentRequestDto) {

        try {
            Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid comment ID"));
//            String nickName = userRepository.findNickNameById(comment.getUser().getUserId());
//            Long loveCnt = commentRepository.countLovesByCommentId(commentId);
//            String url = FileInfoRepository.getFile();
//            String url = null;

            comment.setContent(commentRequestDto.getContent());

//            CommentResponseDto commentResponseDto = CommentMapper.toDto(comment, nickName,
//                loveCnt, url);
//
//            ResponseDto<CommentResponseDto> responseBody = new ResponseDto<>(
//                ResponseCode.SUCCESS,
//                ResponseMessage.SUCCESS,
//                commentResponseDto
//            );

            return ResponseDto.success();
//            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        } catch (Exception e) {
            return ResponseDto.databaseError(e.getMessage()); // 예외 발생 시 데이터베이스 에러 응답
        }
    }

    @Override
    public ResponseEntity<ResponseDto> deleteComment(Long commentId) {

        try {
            Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));

            commentRepository.delete(comment);

            return ResponseDto.success();
        } catch (Exception e) {
            return ResponseDto.databaseError(e.getMessage());
        }
    }
}
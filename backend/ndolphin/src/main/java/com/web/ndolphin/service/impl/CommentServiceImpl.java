package com.web.ndolphin.service.impl;

import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.Comment;
import com.web.ndolphin.domain.Likes;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.comment.CommentRequestDto;
import com.web.ndolphin.mapper.CommentMapper;
import com.web.ndolphin.mapper.LikeMapper;
import com.web.ndolphin.repository.BoardRepository;
import com.web.ndolphin.repository.CommentRepository;
import com.web.ndolphin.repository.LikesRepository;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.service.interfaces.CommentService;
import com.web.ndolphin.service.interfaces.TokenService;
import jakarta.servlet.http.HttpServletRequest;
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
    private final LikesRepository likesRepository;
    private final TokenService tokenService;

    @Override
    public ResponseEntity<ResponseDto> addComment(HttpServletRequest request, Long boardId,
        CommentRequestDto commentRequestDto) {

        try {
            Long userId = tokenService.getUserIdFromToken(request);

            User user = userRepository.findById(userId)
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

            comment.setContent(commentRequestDto.getContent());

            return ResponseDto.success();
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

    @Override
    public ResponseEntity<ResponseDto> likeComment(HttpServletRequest request, Long commentId) {

        try {
            Long userId = tokenService.getUserIdFromToken(request);

            User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
            Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid comment ID"));

            Likes like = LikeMapper.toEntity(user, comment);

            likesRepository.save(like);

            return ResponseDto.success(); // 성공 시 응답
        } catch (Exception e) {
            return ResponseDto.databaseError(e.getMessage()); // 예외 발생 시 데이터베이스 에러 응답
        }
    }

    @Override
    public ResponseEntity<ResponseDto> unlikeComment(HttpServletRequest request, Long commentId) {

        try {
            Long userId = tokenService.getUserIdFromToken(request);

            Likes like = likesRepository.findByUser_UserIdAndComment_Id(userId, commentId)
                .orElseThrow(() -> new IllegalArgumentException("Like not found"));

            likesRepository.delete(like);

            return ResponseDto.success();
        } catch (Exception e) {
            return ResponseDto.databaseError(e.getMessage());
        }
    }
}

package com.web.ndolphin.service.impl;

import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.Comment;
import com.web.ndolphin.domain.EntityType;
import com.web.ndolphin.domain.Likes;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.comment.CommentRequestDto;
import com.web.ndolphin.dto.comment.CommentResponseDto;
import com.web.ndolphin.dto.user.UserDto;
import com.web.ndolphin.mapper.CommentMapper;
import com.web.ndolphin.mapper.LikeMapper;
import com.web.ndolphin.mapper.UserMapper;
import com.web.ndolphin.repository.BoardRepository;
import com.web.ndolphin.repository.CommentRepository;
import com.web.ndolphin.repository.LikesRepository;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.service.interfaces.CommentService;
import com.web.ndolphin.service.interfaces.FileInfoService;
import com.web.ndolphin.service.interfaces.TokenService;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;
    private final LikesRepository likesRepository;
    private final FileInfoService fileInfoService;
    private final TokenService tokenService;

    @Override
    @Transactional
    public ResponseEntity<ResponseDto> addComment(Long boardId, CommentRequestDto commentRequestDto,
        List<MultipartFile> multipartFiles) {

        try {
            Long userId = tokenService.getUserIdFromToken();

            User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
            Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid board ID"));

            Comment comment = CommentMapper.toEntity(commentRequestDto, user, board);

            commentRepository.save(comment);
            fileInfoService.uploadFiles(comment.getId(), EntityType.COMMENT, multipartFiles);

            return ResponseDto.success(); // 성공 시 응답
        } catch (Exception e) {
            return ResponseDto.databaseError(e.getMessage()); // 예외 발생 시 데이터베이스 에러 응답
        }
    }

    @Override
    @Transactional
    public ResponseEntity<ResponseDto> updateComment(Long commentId,
        CommentRequestDto commentRequestDto, List<MultipartFile> multipartFiles,
        String deleteFilesJson) {

        try {
            Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid comment ID"));

            comment.setContent(commentRequestDto.getContent());

            commentRepository.save(comment);

            List<String> fileNamesToDelete = fileInfoService.parseDeleteFilesJson(deleteFilesJson);
            fileInfoService.deleteFiles(commentId, EntityType.COMMENT, fileNamesToDelete);
            fileInfoService.uploadFiles(commentId, EntityType.COMMENT, multipartFiles);

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

            fileInfoService.deleteAndDeleteFiles(commentId, EntityType.COMMENT);

            return ResponseDto.success();
        } catch (Exception e) {
            return ResponseDto.databaseError(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<ResponseDto> likeComment(Long commentId) {

        try {
            Long userId = tokenService.getUserIdFromToken();

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
    public ResponseEntity<ResponseDto> unlikeComment(Long commentId) {

        try {
            Long userId = tokenService.getUserIdFromToken();

            Likes like = likesRepository.findByUser_UserIdAndComment_Id(userId, commentId)
                .orElseThrow(() -> new IllegalArgumentException("Like not found"));

            likesRepository.delete(like);

            return ResponseDto.success();
        } catch (Exception e) {
            return ResponseDto.databaseError(e.getMessage());
        }
    }

    @Override
    @Transactional
    public List<CommentResponseDto> getBoardDetail(Long boardId) {
        Board board = boardRepository.findById(boardId)
            .orElseThrow(() -> new IllegalArgumentException("Invalid board ID"));

        List<Comment> comments = commentRepository.findByBoardId(boardId);

        return comments.stream()
            .map(comment -> {
                Long commentId = comment.getId();

                long likeCount = likesRepository.countByCommentId(commentId);
                boolean isLikedByUser = likesRepository.existsByUserIdAndCommentId(
                    tokenService.getUserIdFromToken(), commentId);
                String contentFileUrl = fileInfoService.getFileUrl(commentId, EntityType.COMMENT);
                UserDto userDto = UserMapper.toDto(comment.getUser());

                CommentResponseDto commentResponseDto = CommentMapper.toDto(comment, likeCount,
                    isLikedByUser, userDto, contentFileUrl);

                return commentResponseDto;
            }).collect(Collectors.toList());
    }
}

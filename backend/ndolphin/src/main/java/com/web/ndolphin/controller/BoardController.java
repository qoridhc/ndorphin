package com.web.ndolphin.controller;

import com.web.ndolphin.domain.*;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.service.impl.BoardService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;
    private final UserRepository userRepository;

    // C - 게시물 생성
    @PostMapping("/{userId}")
    public CreateBoardResponse createBoard(@PathVariable("userId") Long userId,
                                           @RequestBody BoardDtoRequest boardDtoRequest) {
        Board board = new Board();

        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Invalid userId"));
        board.setUser(user);

        board.setSubject(boardDtoRequest.getSubject());
        board.setContent(boardDtoRequest.getContent());
        board.setBoardType(boardDtoRequest.getBoardType());

        Long id = boardService.createBoard(board);

        return new CreateBoardResponse(id);
    }

    // R - 게시물 목록 조회 (타입별로 조회)
    @GetMapping
    public Result<List<BoardDtoResponse>> getAllBoards(@RequestParam(required = false) BoardType type) {
        List<Board> boards;
        List<BoardDtoResponse> resultList = new ArrayList<>();

        if (type != null) {
            boards = boardService.getBoardsByType(type);
        } else {
            boards = boardService.getAllBoards();
        }

        for (Board board : boards) {
            BoardDtoResponse boardDtoResponse = new BoardDtoResponse(
                    board.getId(),
                    board.getUser().getUserId(),
                    board.getSubject(),
                    board.getContent(),
                    board.getSummary(),
                    board.getHit(),
                    board.getBoardType(),
                    board.getCreatedAt(),
                    board.getUpdatedAt(),
                    board.getReactions(),
                    board.getVoteContents(),
                    convertCommentsToDto(board.getComments()), // Comment를 DTO로 변환
                    board.getFavorites());

            resultList.add(boardDtoResponse);
        }

        return new Result<>(resultList);
    }

    // Helper method to convert comments to DTO
    private List<CommentDto> convertCommentsToDto(List<Comment> comments) {
        List<CommentDto> commentDtoList = new ArrayList<>();

        for (Comment comment : comments) {
            CommentDto commentDto = new CommentDto(
                    comment.getId(),
                    comment.getBoard().getId(),
                    comment.getUser().getUserId(),
                    comment.getContent(),
                    comment.getCreatedAt(),
                    comment.getUpdatedAt());
            commentDtoList.add(commentDto);
        }
        return commentDtoList;
    }

    // R - 게시물 상세 조회
    @GetMapping("/{boardId}")
    public BoardDtoResponse getBoardById(@PathVariable("boardId") Long boardId) {
        Board board = boardService.getBoardById(boardId);

        BoardDtoResponse boardDtoResponse = new BoardDtoResponse(
                board.getId(),
                board.getUser().getUserId(),
                board.getSubject(),
                board.getContent(),
                board.getSummary(),
                board.getHit(),
                board.getBoardType(),
                board.getCreatedAt(),
                board.getUpdatedAt(),
                board.getReactions(),
                board.getVoteContents(),
                convertCommentsToDto(board.getComments()), // Comment를 DTO로 변환
                board.getFavorites());

        return boardDtoResponse;
    }

    // U - 게시물 수정
    @PutMapping("/{boardId}")
    public Board updateBoard(@PathVariable("boardId") Long boardId, @RequestBody Board board) {
        return boardService.updateBoard(boardId, board);
    }

    // D - 게시물 삭제
    @DeleteMapping("/{boardId}")
    public void deleteBoard(@PathVariable("boardId") Long boardId) {
        boardService.deleteBoard(boardId);
    }

    @Data
    static class BoardDtoRequest {
        private String subject;
        private String content;
        private BoardType boardType;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    static class BoardDtoResponse {
        private Long id;
        private Long userId;
        private String subject;
        private String content;
        private String summary;
        private int hit;
        private BoardType boardType;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        private List<Reaction> reactions = new ArrayList<>();
        private List<VoteContent> voteContents = new ArrayList<>();
        private List<CommentDto> comments = new ArrayList<>();
        private List<Favorite> favorites = new ArrayList<>();
    }

    @Data
    @AllArgsConstructor
    static class CreateBoardResponse {
        private Long id;
    }

    @Data
    @AllArgsConstructor
    static class Result<T> {
        private T data;
    }

    // C - 특정 게시물에 댓글 추가
    @PostMapping("/{boardId}/comments")
    public Comment addCommentToBoard(@PathVariable("boardId") Long boardId,
                                     @RequestBody CommentDtoRequest commentDtoRequest) {
        Board board = boardService.getBoardById(boardId);
        User user = userRepository.findById(commentDtoRequest.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid userId"));

        Comment comment = new Comment();
        comment.setBoard(board);
        comment.setUser(user);
        comment.setContent(commentDtoRequest.getContent());

        return boardService.addCommentToBoard(comment);
    }

    // R - 특정 게시물의 댓글 조회
    @GetMapping("/{boardId}/comments")
    public List<CommentDto> getCommentsByBoardId(@PathVariable("boardId") Long boardId) {
        List<Comment> comments = boardService.getCommentsByBoardId(boardId);
        return convertCommentsToDto(comments); // Comment를 DTO로 변환하여 반환
    }

    // U - 특정 댓글 수정
    @PutMapping("/comments/{id}")
    public Comment updateComment(@PathVariable("id") Long id, @RequestParam String content) {
        return boardService.updateComment(id, content);
    }

    // D - 특정 댓글 삭제
    @DeleteMapping("/comments/{id}")
    public void deleteComment(@PathVariable("id") Long id) {
        boardService.deleteComment(id);
    }

    @Data
    static class CommentDtoRequest {
        private Long userId; // userId를 Long 타입으로 변경
        private String content;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    static class CommentDto {
        private Long id;
        private Long boardId; // Board 객체 대신 ID 사용
        private Long userId; // User 객체 대신 ID 사용
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private List<LoveDto> loves = new ArrayList<>();

        public CommentDto(Long id, Long boardId, Long userId, String content, LocalDateTime createdAt, LocalDateTime updatedAt) {
            this.id = id;
            this.boardId = boardId;
            this.userId = userId;
            this.content = content;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
        }
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    static class LoveDto {
        private Long id;
        private Long userId; // User 객체 대신 ID 사용
        private Long commentId; // Comment 객체 대신 ID 사용
        private LocalDateTime createdAt;
    }
}

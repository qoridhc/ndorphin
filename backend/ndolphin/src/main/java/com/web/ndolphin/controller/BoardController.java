package com.web.ndolphin.controller;

import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.BoardType;
import com.web.ndolphin.domain.Comment;
import com.web.ndolphin.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    // C - 게시물 생성
    @PostMapping
    public Board createBoard(@RequestBody Board board) {
        return boardService.createBoard(board);
    }

    // R - 게시물 목록 조회 (타입별로 조회)
    @GetMapping
    public List<Board> getAllBoards(@RequestParam(required = false) BoardType type) {
        if (type != null) {
            return boardService.getBoardsByType(type);
        }
        return boardService.getAllBoards();
    }

    // R - 게시물 상세 조회
    @GetMapping("/{boardId}")
    public Board getBoardById(@PathVariable("boardId") Long boardId) {
        return boardService.getBoardById(boardId);
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

    // C - 특정 게시물에 댓글 추가
    @PostMapping("/{boardId}/comments")
    public Comment addCommentToBoard(@PathVariable("boardId") Long boardId, @RequestParam Long userId, @RequestParam String content) {
        return boardService.addCommentToBoard(boardId, userId, content);
    }

    // R - 특정 게시물의 댓글 조회
    @GetMapping("/{boardId}/comments")
    public List<Comment> getCommentsByBoardId(@PathVariable("boardId") Long boardId) {
        return boardService.getCommentsByBoardId(boardId);
    }

    // U - 특정 댓글 수정
    @PutMapping("/comments/{id}")
    public Comment updateComment(@PathVariable("boardId") Long id, @RequestParam String content) {
        return boardService.updateComment(id, content);
    }

    // D - 특정 댓글 삭제
    @DeleteMapping("/comments/{id}")
    public void deleteComment(@PathVariable("boardId") Long id) {
        boardService.deleteComment(id);
    }
}

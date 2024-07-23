package com.web.ndolphin.service.impl;

import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.BoardType;
import com.web.ndolphin.domain.Comment;
import com.web.ndolphin.repository.BoardRepository;
import com.web.ndolphin.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;

    public Long createBoard(Board board) {
        boardRepository.save(board);
        return board.getId();
    }

    public List<Board> getAllBoards() {
        return boardRepository.findAll();
    }

    public List<Board> getBoardsByType(BoardType type) {
        return boardRepository.findByBoardType(type);
    }

    public Board getBoardById(Long boardId) {
        return boardRepository.findById(boardId).orElseThrow(() -> new IllegalArgumentException("Invalid boardId"));
    }

    public Board updateBoard(Long boardId, Board updatedBoard) {
        Board board = getBoardById(boardId);
        board.setSubject(updatedBoard.getSubject());
        board.setContent(updatedBoard.getContent());
        board.setBoardType(updatedBoard.getBoardType());
        return boardRepository.save(board);
    }

    public void deleteBoard(Long boardId) {
        Board board = getBoardById(boardId);
        boardRepository.delete(board);
    }

    public Comment addCommentToBoard(Comment comment) {
        comment.setCreatedAt(LocalDateTime.now());
        return commentRepository.save(comment);
    }

    public List<Comment> getCommentsByBoardId(Long boardId) {
        Board board = getBoardById(boardId);
        return board.getComments();
    }

    public Comment updateComment(Long id, String content) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid commentId"));
        comment.setContent(content);
        return commentRepository.save(comment);
    }

    public void deleteComment(Long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid commentId"));
        commentRepository.delete(comment);
    }
}

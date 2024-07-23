package com.web.ndolphin.service;

import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.BoardType;
import com.web.ndolphin.domain.Comment;

import java.util.List;

public interface BoardService {
    List<Board> getAllBoards();
    List<Board> getBoardsByType(BoardType type);
    Board getBoardById(Long id);
    Board createBoard(Board board);
    Board updateBoard(Long id, Board boardDetails);
    void deleteBoard(Long id);

    Comment addCommentToBoard(Long boardId, Long userId, String content);
    List<Comment> getCommentsByBoardId(Long boardId);
    Comment updateComment(Long id, String content);
    void deleteComment(Long id);
}

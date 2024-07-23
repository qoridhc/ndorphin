package com.web.ndolphin.service.impl;

import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.BoardType;
import com.web.ndolphin.domain.Comment;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.repository.BoardRepository;
import com.web.ndolphin.repository.CommentRepository;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    // R - 모든 게시물 조회
    @Transactional(readOnly = true)
    public List<Board> getAllBoards() {
        return boardRepository.findAll();
    }

    // R - 특정 타입의 게시물 조회
    @Transactional(readOnly = true)
    public List<Board> getBoardsByType(BoardType type) {
        return boardRepository.findByBoardType(type);
    }

    // R - 특정 게시물 조회
    @Transactional(readOnly = true)
    public Board getBoardById(Long id) {
        return boardRepository.findById(id).orElse(null);
    }

    // C - 게시물 생성
    @Transactional
    public Board createBoard(Board board) {
        board.setCreatedAt(LocalDateTime.now());
        board = boardRepository.save(board);

        // 게시판 타입에 따른 특화된 로직 추가
        if (board.getBoardType() == BoardType.VOTE_BOARD) {
            // 만약에(투표) 게시판에 특화된 로직
        } else if (board.getBoardType() == BoardType.OPINION_BOARD) {
            // 만약에(의견) 게시판에 특화된 로직
        } else if (board.getBoardType() == BoardType.RELAY_BOARD) {
            // 릴레이 게시판에 특화된 로직
        } else if (board.getBoardType() == BoardType.OK_BOARD) {
            // 괜찮아 게시판에 특화된 로직
        } else if (board.getBoardType() == BoardType.BYE_BOARD) {
            // 작별 게시판에 특화된 로직
        }

        return board;
    }

    // U - 게시물 수정
    @Transactional
    public Board updateBoard(Long id, Board boardDetails) {
        Board board = boardRepository.findById(id).orElse(null);
        if (board != null) {
            board.setSubject(boardDetails.getSubject());
            board.setContent(boardDetails.getContent());
            board.setBoardType(boardDetails.getBoardType());
            board.setUpdatedAt(LocalDateTime.now());
            board = boardRepository.save(board);

            // 게시판 타입에 따른 특화된 로직 추가
            if (board.getBoardType() == BoardType.VOTE_BOARD) {
                // 만약에(투표) 게시판에 특화된 로직
            } else if (board.getBoardType() == BoardType.OPINION_BOARD) {
                // 만약에(의견) 게시판에 특화된 로직
            } else if (board.getBoardType() == BoardType.RELAY_BOARD) {
                // 릴레이 게시판에 특화된 로직
            } else if (board.getBoardType() == BoardType.OK_BOARD) {
                // 괜찮아 게시판에 특화된 로직
            } else if (board.getBoardType() == BoardType.BYE_BOARD) {
                // 작별 게시판에 특화된 로직
            }

            return board;
        }
        return null;
    }

    // D - 게시물 삭제
    @Transactional
    public void deleteBoard(Long id) {
        boardRepository.deleteById(id);
    }

    // C - 댓글 추가
    @Transactional
    public Comment addCommentToBoard(Long boardId, Long userId, String content) {
        Board board = boardRepository.findById(boardId).orElse(null);
        if (board == null) {
            return null; // 게시판이 존재하지 않는 경우 처리
        }

        User user = userRepository.findByUserId(userId);
        if (user == null) {
            return null; // 유저가 존재하지 않는 경우 처리
        }

        Comment comment = new Comment();
        comment.setBoard(board);
        comment.setUser(user);
        comment.setContent(content);
        comment.setCreatedAt(LocalDateTime.now());
        comment = commentRepository.save(comment);

        // 게시판 타입에 따른 특화된 로직 추가
        if (board.getBoardType() == BoardType.VOTE_BOARD) {
            // 만약에(투표) 게시판에 특화된 로직
        } else if (board.getBoardType() == BoardType.OPINION_BOARD) {
            // 만약에(의견) 게시판에 특화된 로직
        } else if (board.getBoardType() == BoardType.RELAY_BOARD) {
            // 릴레이 게시판에 특화된 로직
        } else if (board.getBoardType() == BoardType.OK_BOARD) {
            // 괜찮아 게시판에 특화된 로직
        } else if (board.getBoardType() == BoardType.BYE_BOARD) {
            // 작별 게시판에 특화된 로직
        }

        return comment;
    }

    // R - 특정 게시물의 댓글 조회
    @Transactional(readOnly = true)
    public List<Comment> getCommentsByBoardId(Long boardId) {
        return commentRepository.findByBoardId(boardId);
    }

    // U - 댓글 수정
    @Transactional
    public Comment updateComment(Long id, String content) {
        Comment comment = commentRepository.findById(id).orElse(null);
        if (comment != null) {
            comment.setContent(content);
            comment.setUpdatedAt(LocalDateTime.now());
            return commentRepository.save(comment);
        }
        return null;
    }

    // D - 댓글 삭제
    @Transactional
    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }
}

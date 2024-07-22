package com.web.ndolphin.service.impl;

import com.web.ndolphin.domain.Board;
import com.web.ndolphin.repository.BoardRepository;
import com.web.ndolphin.service.BoardService;
import com.web.ndolphin.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.web.ndolphin.domain.BoardType;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;

    private final S3Service s3Service;

    // R
    public List<Board> getAllBoards() {
        return boardRepository.findAll();
    }

    public Board getBoardById(Long id) {
        return boardRepository.findById(id).orElse(null);
    }

    // C
    /**
     * 작별 BYE_BOARD
     * 괜찮아 OK_BOARD
     * 만약에 IF_BOARD
     * 릴레이 RELAY_BOARD
     */
    public Board createBoard(Board board) {
        // TODO: 게시판 타입에 따른 특화된 로직 추가
        if (board.getBoardType() == BoardType.VOTE_BOARD) {
            // 만약에(투표) 게시판에 특화된 로직
        }else if (board.getBoardType() == BoardType.OPINION_BOARD) {
            // 만약에(의견) 게시판에 특화된 로직
        } else if (board.getBoardType() == BoardType.RELAY_BOARD) {
            // 릴레이 게시판에 특화된 로직
        } else if (board.getBoardType() == BoardType.OK_BOARD) {
            // 괜찮아 게시판에 특화된 로직
        } else if (board.getBoardType() == BoardType.BYE_BOARD) {
            // 작별 게시판에 특화된 로직 (CRUD만 가능)
        }

        return boardRepository.save(board);
    }

    // U
    public Board updateBoard(Long id, Board boardDetails) {
        Board board = boardRepository.findById(id).orElse(null);

        if (board != null) {
            board.setSubject(boardDetails.getSubject());
            board.setContent(boardDetails.getContent());
            board.setBoardType(boardDetails.getBoardType());

            // TODO: 게시판 타입에 따른 특화된 로직 추가
            if (board.getBoardType() == BoardType.VOTE_BOARD) {
                // 만약에(투표) 게시판에 특화된 로직
            }else if (board.getBoardType() == BoardType.OPINION_BOARD) {
                // 만약에(의견) 게시판에 특화된 로직
            } else if (board.getBoardType() == BoardType.RELAY_BOARD) {
                // 릴레이 게시판에 특화된 로직
            } else if (board.getBoardType() == BoardType.OK_BOARD) {
                // 괜찮아 게시판에 특화된 로직
            } else if (board.getBoardType() == BoardType.BYE_BOARD) {
                // 작별 게시판에 특화된 로직
            }

            return boardRepository.save(board);
        }
        return null;
    }

    // D
    public void deleteBoard(Long id) {
        boardRepository.deleteById(id);
    }
}

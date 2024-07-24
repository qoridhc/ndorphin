package com.web.ndolphin.service.impl;

import com.web.ndolphin.common.ResponseCode;
import com.web.ndolphin.common.ResponseMessage;
import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.BoardType;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.board.BoardDto;
import com.web.ndolphin.dto.board.request.BoardUpdateRequestDto;
import com.web.ndolphin.dto.board.response.BoardUpdateResponseDto;
import com.web.ndolphin.mapper.BoardConverter;
import com.web.ndolphin.repository.BoardRepository;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.web.ndolphin.domain.BoardType.*;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;

    @Override
    public ResponseEntity<ResponseDto> createBoard(Long userId, BoardUpdateRequestDto boardUpdateRequestDto) {
        // User 객체를 조회
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isEmpty()) {
            return ResponseDto.validationFail();  // User not found 응답
        }
        User user = optionalUser.get();

        // 게시판 타입에 따른 분기 처리
        switch (BoardType.valueOf(boardUpdateRequestDto.getBoardType())) {
            case VOTE_BOARD:
                // 투표 게시판 - 이미지 첨부 가능
                break;
            case OPINION_BOARD:
                // 의견 게시판 - 댓글 가능
                break;
            case RELAY_BOARD:
                // 릴레이 게시판 - 댓글 및 이미지 첨부 가능
                break;
            case OK_BOARD:
                // 괜찮아 게시판 - 댓글 가능
                break;
            case BYE_BOARD:
                // 작별 게시판 - 댓글 및 이미지 첨부 가능
                break;
            default:
                return ResponseDto.validationFail();
        }

        // User 객체를 convertToEntity 메서드에 전달
        Board board = BoardConverter.convertToEntity(boardUpdateRequestDto, user);

        boardRepository.save(board);

        ResponseDto<BoardDto> responseBody= new ResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, boardUpdateRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    @Override
    public ResponseEntity<ResponseDto> getBoardsByType(BoardType boardType) {
        List<Board> boards = boardRepository.findByBoardType(boardType);
        List<BoardDto> boardDtos = new ArrayList<>();

        for (Board board : boards) {
            BoardDto boardDto = BoardConverter.convertToDto(board);
            boardDtos.add(boardDto);
        }

        ResponseDto<BoardDto> responseBody= new ResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, boardDtos);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    @Override
    public ResponseEntity<ResponseDto> getBoardById(Long boardId) {
        Optional<Board> optionalBoard = boardRepository.findById(boardId);

        if (optionalBoard.isEmpty()) {
            return ResponseDto.databaseError();
        }

        Board board = optionalBoard.get();
        BoardDto boardDto = BoardConverter.convertToDto(board);
        ResponseDto<BoardDto> responseBody= new ResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, boardDto);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public ResponseEntity<ResponseDto> updateBoard(Long boardId, BoardUpdateRequestDto boardUpdateRequestDto) {
        // 기존 엔티티를 가져오기
        Optional<Board> optionalBoard = boardRepository.findById(boardId);

        if (optionalBoard.isEmpty()) {
            return ResponseDto.databaseError();
        }

        Board existingBoard = optionalBoard.get();
        existingBoard.setSubject(boardUpdateRequestDto.getSubject());
        existingBoard.setContent(boardUpdateRequestDto.getContent());
        existingBoard.setUpdatedAt(LocalDateTime.now());

        boardRepository.save(existingBoard);

        BoardDto boardDto = BoardConverter.convertToDto(existingBoard);
        ResponseDto<BoardDto> responseBody= new ResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, boardDto);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    @Override
    public ResponseEntity<ResponseDto> deleteBoard(Long boardId) {
        boardRepository.deleteById(boardId);

        return ResponseDto.success();
    }
}

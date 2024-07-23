package com.web.ndolphin.service.impl;

import com.web.ndolphin.common.ResponseCode;
import com.web.ndolphin.common.ResponseMessage;
import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.board.BoardDto;
import com.web.ndolphin.dto.board.request.BoardUpdateRequestDto;
import com.web.ndolphin.mapper.BoardConverter;
import com.web.ndolphin.repository.BoardRepository;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

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

        // User 객체를 convertToEntity 메서드에 전달
        Board board = BoardConverter.convertToEntity(boardUpdateRequestDto, user);

        boardRepository.save(board);

        ResponseDto<BoardDto> responseBody= new ResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, boardUpdateRequestDto);
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

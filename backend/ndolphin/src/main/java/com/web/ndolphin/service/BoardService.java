package com.web.ndolphin.service;

import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.BoardType;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.board.request.BoardUpdateRequestDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface BoardService {
    ResponseEntity<ResponseDto> createBoard(Long userId, BoardUpdateRequestDto boardUpdateRequestDto);

    /*ResponseEntity<ResponseDto> getBoardsByType(BoardType type);

    ResponseEntity<ResponseDto> getBoardById(Long boardId);*/

    ResponseEntity<ResponseDto> updateBoard(Long boardId, BoardUpdateRequestDto boardUpdateRequestDto);

    ResponseEntity<ResponseDto> deleteBoard(Long boardId);
}

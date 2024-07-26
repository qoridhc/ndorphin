package com.web.ndolphin.service;

import com.web.ndolphin.domain.BoardType;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.board.request.BoardRequestDto;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface BoardService {

    ResponseEntity<ResponseDto> createBoard(Long userId, BoardRequestDto boardRequestDto,
        List<MultipartFile> multipartFiles);

    ResponseEntity<ResponseDto> getBoardsByType(BoardType boardType);

    ResponseEntity<ResponseDto> getBoardById(Long boardId);

    ResponseEntity<ResponseDto> updateBoard(Long boardId, BoardRequestDto boardRequestDto);

    ResponseEntity<ResponseDto> deleteBoard(Long boardId);
}
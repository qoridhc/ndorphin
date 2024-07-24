package com.web.ndolphin.controller;

import com.web.ndolphin.domain.BoardType;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.board.request.BoardUpdateRequestDto;
import com.web.ndolphin.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/boards")
public class BoardController {

    private final BoardService boardService;

    // C - 게시물 생성
    @PostMapping("/{userId}")
    public ResponseEntity createBoard(@PathVariable("userId") Long userId,
        @RequestBody BoardUpdateRequestDto boardUpdateRequestDto) {

        ResponseEntity<ResponseDto> response = boardService.createBoard(userId,
            boardUpdateRequestDto);
        return response;
    }

    // R - 게시물 목록 조회 (타입별로 조회)/api/v1/boards?type={boardType}
    @GetMapping()
    public ResponseEntity<ResponseDto> getBoardsByType(@RequestParam("type") BoardType boardType) {

        ResponseEntity<ResponseDto> response = boardService.getBoardsByType(boardType);
        return response;
    }

    // R - 게시물 상세 조회 /api/v1/boards/{boardId}
    @GetMapping("/{boardId}")
    public ResponseEntity<ResponseDto> getBoardById(@PathVariable Long boardId) {

        ResponseEntity<ResponseDto> response = boardService.getBoardById(boardId);
        return response;
    }

    // U - 게시물 수정
    @PutMapping("/{boardId}")
    public ResponseEntity<ResponseDto> updateBoard(@PathVariable("boardId") Long boardId,
        @RequestBody BoardUpdateRequestDto boardUpdateRequestDto) {

        ResponseEntity<ResponseDto> resonse = boardService.updateBoard(boardId,
            boardUpdateRequestDto);
        return resonse;
    }

    // D - 게시물 삭제
    @DeleteMapping("/{boardId}")
    public ResponseEntity<ResponseDto> deeteBoard(@PathVariable("boardId") Long boardId) {

        ResponseEntity<ResponseDto> resonse = boardService.deleteBoard(boardId);
        return resonse;
    }
}
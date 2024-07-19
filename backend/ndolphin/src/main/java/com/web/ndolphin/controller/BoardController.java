package com.web.ndolphin.controller;

import com.web.ndolphin.dto.BoardRequestDto;
import com.web.ndolphin.dto.BoardResponseDto;
import com.web.ndolphin.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/boards")
public class BoardController {

    private final BoardService boardService;

    // 새로운 Board 생성
    @PostMapping
    public BoardResponseDto createBoard(@RequestBody BoardRequestDto boardRequestDto) {
        return boardService.createBoard(boardRequestDto);
    }

    // 모든 Board 조회
    @GetMapping
    public List<BoardResponseDto> getAllBoards() {
        return boardService.getAllBoards();
    }

    // ID로 Board 조회
    @GetMapping("/{id}")
    public BoardResponseDto getBoardById(@PathVariable("id") Long id) {
        return boardService.getBoardById(id);
    }


    // 기존 Board 업데이트
    @PutMapping("/{id}")
    public BoardResponseDto updateBoard(@PathVariable("id") Long id, @RequestBody BoardRequestDto boardRequestDto) {
        return boardService.updateBoard(id, boardRequestDto);
    }

    // Board 삭제
    @DeleteMapping("/{id}")
    public void deleteBoard(@PathVariable("id") Long id) {
        boardService.deleteBoard(id);
    }
}

package com.web.ndolphin.controller;

import com.web.ndolphin.domain.BoardType;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.board.request.BoardRequestDto;
import com.web.ndolphin.service.BoardService;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/boards")
public class BoardController {

    private final BoardService boardService;

    // C - 게시물 생성
    @PostMapping("/{userId}")
    public ResponseEntity<ResponseDto> createBoard(
        @PathVariable("userId") Long userId,
        @RequestPart(name = "request") BoardRequestDto boardRequestDto,
        @RequestPart(name = "files", required = false) List<MultipartFile> multipartFiles) throws IOException {

        ResponseEntity<ResponseDto> response = boardService.createBoard(userId, boardRequestDto, multipartFiles);
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
//    @PutMapping("/{boardId}")
//    public ResponseEntity<ResponseDto> updateBoard(
//        @PathVariable("userId") Long userId,
//        @RequestPart(name = "files", required = false) List<MultipartFile> files,
//        @RequestPart(name = "request") BoardUpdateRequestDto boardUpdateRequestDto) throws IOException {
//
//        boardUpdateRequestDto.setFiles(files);
//        ResponseEntity<ResponseDto> response = boardService.updateBoard(userId, boardUpdateRequestDto);
//        return response;
//    }

    // D - 게시물 삭제
    @DeleteMapping("/{boardId}")
    public ResponseEntity<ResponseDto> deleteBoard(@PathVariable("boardId") Long boardId) {
        ResponseEntity<ResponseDto> response = boardService.deleteBoard(boardId);
        return response;
    }
}

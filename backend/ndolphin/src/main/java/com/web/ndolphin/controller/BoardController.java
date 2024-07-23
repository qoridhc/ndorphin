package com.web.ndolphin.controller;

import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.BoardType;
import com.web.ndolphin.domain.Comment;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.board.request.BoardUpdateRequestDto;
import com.web.ndolphin.dto.comment.CommentDto;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.service.BoardService;
import com.web.ndolphin.service.impl.BoardServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    // C - 게시물 생성
    @PostMapping("/{userId}")
    public ResponseEntity createBoard(@PathVariable("userId") Long userId,
                                      @RequestBody BoardUpdateRequestDto boardUpdateRequestDto) {
        return boardService.createBoard(userId, boardUpdateRequestDto);
    }

    /*R - 게시물 목록 조회 (타입별로 조회)

    R - 게시물 상세 조회*/

    // U - 게시물 수정
    @PutMapping("/{boardId}")
    public ResponseEntity<ResponseDto> updateBoard(@PathVariable("boardId") Long boardId,
                                                   @RequestBody BoardUpdateRequestDto boardUpdateRequestDto) {
        return boardService.updateBoard(boardId, boardUpdateRequestDto);
    }

    // D - 게시물 삭제
    @DeleteMapping("/{boardId}")
    public ResponseEntity<ResponseDto> deleteBoard(@PathVariable("boardId") Long boardId) {
        return boardService.deleteBoard(boardId);
    }
}
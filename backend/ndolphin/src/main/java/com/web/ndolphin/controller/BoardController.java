package com.web.ndolphin.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.ndolphin.domain.BoardType;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.board.request.BoardRequestDto;
import com.web.ndolphin.dto.reaction.request.ReactionRequestDto;
import com.web.ndolphin.service.interfaces.BoardService;
import com.web.ndolphin.service.interfaces.ReactionService;
import java.io.IOException;
import java.util.List;
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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/boards")
public class BoardController {

    private final BoardService boardService;
    private final ReactionService reactionService;

    @PostMapping("/{userId}")
    public ResponseEntity<ResponseDto> createBoard(
        @PathVariable("userId") Long userId,
        @RequestPart(name = "request") BoardRequestDto boardRequestDto,
        @RequestPart(name = "files", required = false) List<MultipartFile> multipartFiles)
        throws IOException {

        ResponseEntity<ResponseDto> response = boardService.createBoard(userId, boardRequestDto,
            multipartFiles);
        return response;
    }

    @GetMapping()
    public ResponseEntity<ResponseDto> getBoardsByType(@RequestParam("type") BoardType boardType) {

        ResponseEntity<ResponseDto> response = boardService.getBoardsByType(boardType);
        return response;
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<ResponseDto> getBoardById(
        @PathVariable Long boardId) {

        ResponseEntity<ResponseDto> response = boardService.getBoardById(boardId);
        return response;
    }

    @PutMapping("/{boardId}")
    public ResponseEntity<ResponseDto> updateBoard(
        @PathVariable("boardId") Long boardId,
        @RequestPart(name = "request") BoardRequestDto boardRequestDto,
        @RequestPart(name = "files", required = false) List<MultipartFile> multipartFiles,
        @RequestParam(name = "deleteFiles", required = false) String deleteFilesJson)
        throws IOException {

        List<String> fileNamesToDelete = null;
        if (deleteFilesJson != null) {
            ObjectMapper objectMapper = new ObjectMapper();
            fileNamesToDelete = objectMapper.readValue(deleteFilesJson,
                new TypeReference<List<String>>() {
                });
        }

        ResponseEntity<ResponseDto> response = boardService.updateBoard(boardId, boardRequestDto,
            multipartFiles,
            fileNamesToDelete);
        return response;
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity<ResponseDto> deleteBoard(@PathVariable("boardId") Long boardId) {

        ResponseEntity<ResponseDto> response = boardService.deleteBoard(boardId);
        return response;
    }

    @PostMapping("/{boardId}/reactions")
    public ResponseEntity<ResponseDto> addReaction(
        @PathVariable("boardId") Long boardId,
        @RequestBody ReactionRequestDto reactionRequestDto
    ) {

        ResponseEntity<ResponseDto> response = reactionService.addReaction(boardId,
            reactionRequestDto);
        return response;
    }

    @PutMapping("/{reactionId}/reactions")
    public ResponseEntity<ResponseDto> updateReaction(
        @PathVariable Long reactionId,
        @RequestBody ReactionRequestDto reactionRequestDto) {

        ResponseEntity<ResponseDto> response = reactionService.updateReaction(reactionId,
            reactionRequestDto);
        return response;
    }

    @DeleteMapping("/{reactionId}/reactions")
    public ResponseEntity<ResponseDto> deleteReaction(@PathVariable Long reactionId) {

        ResponseEntity<ResponseDto> response = reactionService.deleteReaction(reactionId);
        return response;
    }
}

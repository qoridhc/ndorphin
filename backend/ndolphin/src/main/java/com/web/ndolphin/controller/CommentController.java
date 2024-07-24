package com.web.ndolphin.controller;

import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.comment.CommentRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/boards/{boardId}/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/{commentId}")
    public ResponseEntity<ResponseDto> addFavorite(
        @RequestBody CommentRequestDto commentRequestDto) {

        ResponseEntity<ResponseDto> response = commentService.addComment(commentRequestDto);

        return response;
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<ResponseDto> addFavorite(
        @RequestBody CommentRequestDto commentRequestDto) {

        ResponseEntity<ResponseDto> response = commentService.updateComment(commentRequestDto);

        return response;
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<ResponseDto> removeFavorite(
        @PathVariable Long userId,
        @PathVariable Long commentId) {

        ResponseEntity<ResponseDto> response = commentService.removeComment(userId, commentId);

        return response;
    }
}

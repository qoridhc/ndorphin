package com.web.ndolphin.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.comment.CommentRequestDto;
import com.web.ndolphin.service.interfaces.CommentService;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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
@RequestMapping("/api/v1/boards/{boardId}/comments")
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<ResponseDto> addComment(
        HttpServletRequest request,
        @PathVariable Long boardId,
        @RequestBody CommentRequestDto commentRequestDto,
        @RequestPart(name = "files", required = false) List<MultipartFile> multipartFiles) {

        ResponseEntity<ResponseDto> response = commentService.addComment(request, boardId,
            commentRequestDto, multipartFiles);

        return response;
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<ResponseDto> updateComment(
        @PathVariable Long commentId,
        @RequestBody CommentRequestDto commentRequestDto,
        @RequestPart(name = "files", required = false) List<MultipartFile> multipartFiles,
        @RequestParam(name = "deleteFiles", required = false) String deleteFilesJson)
        throws JsonProcessingException {

        List<String> fileNamesToDelete = null;
        if (deleteFilesJson != null) {
            ObjectMapper objectMapper = new ObjectMapper();
            fileNamesToDelete = objectMapper.readValue(deleteFilesJson,
                new TypeReference<List<String>>() {
                });
        }

        ResponseEntity<ResponseDto> response = commentService.updateComment(commentId,
            commentRequestDto, multipartFiles, fileNamesToDelete);

        return response;
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<ResponseDto> deleteComment(@PathVariable Long commentId) {

        ResponseEntity<ResponseDto> response = commentService.deleteComment(commentId);

        return response;
    }

    @PostMapping("/{commentId}/like")
    public ResponseEntity<ResponseDto> likeComment(
        HttpServletRequest request,
        @PathVariable Long commentId) {

        ResponseEntity<ResponseDto> response = commentService.likeComment(request, commentId);

        return response;
    }

    @DeleteMapping("/{commentId}/like")
    public ResponseEntity<ResponseDto> unlikeComment(
        HttpServletRequest request,
        @PathVariable Long commentId) {

        ResponseEntity<ResponseDto> response = commentService.unlikeComment(request, commentId);

        return response;
    }
}

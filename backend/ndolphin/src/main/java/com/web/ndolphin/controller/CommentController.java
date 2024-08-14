package com.web.ndolphin.controller;

import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.comment.CommentRequestDto;
import com.web.ndolphin.service.interfaces.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "댓글 컨트롤러", description = "댓글 관리 API입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/boards/{boardId}/comments")
public class CommentController {

    private final CommentService commentService;

    @Operation(summary = "댓글 추가", description = "게시판에 댓글을 추가합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "댓글이 성공적으로 추가되었습니다.",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류입니다.",
            content = @Content(schema = @Schema()))
    })
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseDto> addComment(
        @Parameter(description = "게시판 ID", required = true) @PathVariable Long boardId,
        @Parameter(description = "추가할 댓글 정보", required = true) @RequestPart(name = "request") CommentRequestDto commentRequestDto,
        @Parameter(description = "첨부 파일 목록", required = false) @RequestPart(name = "files", required = false) List<MultipartFile> multipartFiles) {

        ResponseEntity<ResponseDto> response = commentService.addComment(boardId, commentRequestDto, multipartFiles);
        return response;
    }

    @Operation(summary = "댓글 수정", description = "기존 댓글을 수정합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "댓글이 성공적으로 수정되었습니다.",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "404", description = "댓글을 찾을 수 없습니다.",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류입니다.",
            content = @Content(schema = @Schema()))
    })
    @PutMapping(value = "/{commentId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseDto> updateComment(
        @Parameter(description = "게시판 ID", required = true) @PathVariable Long boardId,
        @Parameter(description = "댓글 ID", required = true) @PathVariable Long commentId,
        @Parameter(description = "수정할 댓글 정보", required = true) @RequestPart(name = "request") CommentRequestDto commentRequestDto,
        @Parameter(description = "첨부 파일 목록", required = false) @RequestPart(name = "files", required = false) List<MultipartFile> multipartFiles,
        @Parameter(description = "삭제할 파일 목록 JSON", required = false) @RequestPart(name = "deleteFiles", required = false) String deleteFilesJson) {

        ResponseEntity<ResponseDto> response = commentService.updateComment(commentId, commentRequestDto, multipartFiles, deleteFilesJson);
        return response;
    }

    @Operation(summary = "댓글 삭제", description = "기존 댓글을 삭제합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "댓글이 성공적으로 삭제되었습니다.",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "404", description = "댓글을 찾을 수 없습니다.",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류입니다.",
            content = @Content(schema = @Schema()))
    })
    @DeleteMapping("/{commentId}")
    public ResponseEntity<ResponseDto> deleteComment(
        @Parameter(description = "삭제할 댓글 ID", required = true) @PathVariable Long commentId) {

        ResponseEntity<ResponseDto> response = commentService.deleteComment(commentId);
        return response;
    }

    @Operation(summary = "댓글 좋아요", description = "댓글에 좋아요를 추가합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "댓글에 좋아요가 성공적으로 추가되었습니다.",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "404", description = "댓글을 찾을 수 없습니다.",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류입니다.",
            content = @Content(schema = @Schema()))
    })
    @PostMapping("/{commentId}/like")
    public ResponseEntity<ResponseDto> likeComment(
        @Parameter(description = "좋아요할 댓글 ID", required = true) @PathVariable Long commentId) {

        ResponseEntity<ResponseDto> response = commentService.likeComment(commentId);
        return response;
    }

    @Operation(summary = "댓글 좋아요 취소", description = "댓글의 좋아요를 취소합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "댓글의 좋아요가 성공적으로 취소되었습니다.",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "404", description = "댓글을 찾을 수 없습니다.",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류입니다.",
            content = @Content(schema = @Schema()))
    })
    @DeleteMapping("/{commentId}/like")
    public ResponseEntity<ResponseDto> unlikeComment(
        @Parameter(description = "좋아요를 취소할 댓글 ID", required = true) @PathVariable Long commentId) {

        ResponseEntity<ResponseDto> response = commentService.unlikeComment(commentId);
        return response;
    }
}

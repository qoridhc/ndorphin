package com.web.ndolphin.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.ndolphin.domain.BoardType;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.board.request.BoardRequestDto;
import com.web.ndolphin.dto.reaction.request.ReactionRequestDto;
import com.web.ndolphin.service.interfaces.BoardService;
import com.web.ndolphin.service.interfaces.ReactionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
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

@Tag(name = "게시판 컨트롤러", description = "게시판 API입니다")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/boards")
public class BoardController {

    private final BoardService boardService;
    private final ReactionService reactionService;

    @Operation(summary = "게시글 생성", description = "새로운 게시글을 생성합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "게시글이 성공적으로 생성되었습니다.",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류입니다.",
            content = @Content(schema = @Schema()))
    })
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseDto> createBoard(
        @Parameter(description = "생성할 게시글의 정보", required = true)
        @RequestPart(name = "request") BoardRequestDto boardRequestDto,
        @Parameter(description = "첨부 파일 목록", required = false)
        @RequestPart(name = "files", required = false) List<MultipartFile> multipartFiles)
        throws IOException {

        ResponseEntity<ResponseDto> response = boardService.createBoard(boardRequestDto, multipartFiles);
        return response;
    }

    @Operation(summary = "게시글 목록 조회", description = "게시판 유형 및 필터에 따른 게시글 목록을 조회합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "게시글 목록이 성공적으로 조회되었습니다.",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류입니다.",
            content = @Content(schema = @Schema()))
    })
    @GetMapping()
    public ResponseEntity<ResponseDto> getBoardsByType(
        @Parameter(description = "게시판 유형", required = true)
        @RequestParam("type") BoardType boardType,
        @Parameter(description = "첫 번째 필터", required = false)
        @RequestParam(value = "filter1", required = false) String filter1,
        @Parameter(description = "두 번째 필터", required = false, example = "recent")
        @RequestParam(value = "filter2", required = false, defaultValue = "recent") String filter2,
        @Parameter(description = "검색어", required = false)
        @RequestParam(value = "search", required = false) String search) {

        ResponseEntity<ResponseDto> response = boardService.getBoardsByType(boardType, filter1, filter2, search);
        return response;
    }

    @Operation(summary = "게시글 조회", description = "특정 게시글을 조회합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "게시글이 성공적으로 조회되었습니다.",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "404", description = "게시글을 찾을 수 없습니다.",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류입니다.",
            content = @Content(schema = @Schema()))
    })
    @GetMapping("/{boardId}")
    public ResponseEntity<ResponseDto> getBoardById(
        @Parameter(description = "조회할 게시글 ID", required = true)
        @PathVariable Long boardId) {

        ResponseEntity<ResponseDto> response = boardService.getBoardById(boardId);
        return response;
    }

    @Operation(summary = "게시글 수정", description = "기존 게시글을 수정합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "게시글이 성공적으로 수정되었습니다.",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "404", description = "게시글을 찾을 수 없습니다.",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류입니다.",
            content = @Content(schema = @Schema()))
    })
    @PutMapping(value = "/{boardId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseDto> updateBoard(
        @Parameter(description = "수정할 게시글 ID", required = true)
        @PathVariable("boardId") Long boardId,
        @Parameter(description = "수정할 게시글 정보", required = true)
        @RequestPart(name = "request") BoardRequestDto boardRequestDto,
        @Parameter(description = "첨부 파일 목록", required = false)
        @RequestPart(name = "files", required = false) List<MultipartFile> multipartFiles,
        @Parameter(description = "삭제할 파일 목록 JSON", required = false)
        @RequestParam(name = "deleteFiles", required = false) String deleteFilesJson)
        throws IOException {

        List<String> fileNamesToDelete = null;
        if (deleteFilesJson != null) {
            ObjectMapper objectMapper = new ObjectMapper();
            fileNamesToDelete = objectMapper.readValue(deleteFilesJson, new TypeReference<List<String>>() {});
        }

        ResponseEntity<ResponseDto> response = boardService.updateBoard(boardId, boardRequestDto, multipartFiles, fileNamesToDelete);
        return response;
    }

    @Operation(summary = "게시글 삭제", description = "기존 게시글을 삭제합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "게시글이 성공적으로 삭제되었습니다.",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "404", description = "게시글을 찾을 수 없습니다.",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류입니다.",
            content = @Content(schema = @Schema()))
    })
    @DeleteMapping("/{boardId}")
    public ResponseEntity<ResponseDto> deleteBoard(
        @Parameter(description = "삭제할 게시글 ID", required = true)
        @PathVariable("boardId") Long boardId) {

        ResponseEntity<ResponseDto> response = boardService.deleteBoard(boardId);
        return response;
    }

    @Operation(summary = "반응 추가", description = "게시글에 반응을 추가합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "반응이 성공적으로 추가되었습니다.",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류입니다.",
            content = @Content(schema = @Schema()))
    })
    @PostMapping("/{boardId}/reactions")
    public ResponseEntity<ResponseDto> addReaction(
        @Parameter(description = "게시글 ID", required = true)
        @PathVariable("boardId") Long boardId,
        @Parameter(description = "추가할 반응 정보", required = true)
        @RequestBody ReactionRequestDto reactionRequestDto) {

        System.out.println("HERE " + reactionRequestDto.getReactionType());

        ResponseEntity<ResponseDto> response = reactionService.addReaction(boardId, reactionRequestDto);
        return response;
    }

    @Operation(summary = "반응 수정", description = "기존 반응을 수정합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "반응이 성공적으로 수정되었습니다.",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "404", description = "반응을 찾을 수 없습니다.",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류입니다.",
            content = @Content(schema = @Schema()))
    })
    @PutMapping("/{reactionId}/reactions")
    public ResponseEntity<ResponseDto> updateReaction(
        @Parameter(description = "수정할 반응 ID", required = true)
        @PathVariable Long reactionId,
        @Parameter(description = "수정할 반응 정보", required = true)
        @RequestBody ReactionRequestDto reactionRequestDto) {

        ResponseEntity<ResponseDto> response = reactionService.updateReaction(reactionId, reactionRequestDto);
        return response;
    }

    @Operation(summary = "반응 삭제", description = "기존 반응을 삭제합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "반응이 성공적으로 삭제되었습니다.",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "404", description = "반응을 찾을 수 없습니다.",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류입니다.",
            content = @Content(schema = @Schema()))
    })
    @DeleteMapping("/{reactionId}/reactions")
    public ResponseEntity<ResponseDto> deleteReaction(
        @Parameter(description = "삭제할 반응 ID", required = true)
        @PathVariable Long reactionId) {

        ResponseEntity<ResponseDto> response = reactionService.deleteReaction(reactionId);
        return response;
    }
}

package com.web.ndolphin.controller;

import com.web.ndolphin.domain.BoardType;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.board.request.BoardRequestDto;
import com.web.ndolphin.dto.board.response.BoardDto;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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
            @RequestPart(name = "request") BoardRequestDto boardRequestDto,
            @RequestPart(name = "files", required = false) List<MultipartFile> multipartFiles)
            throws IOException {

        ResponseEntity<ResponseDto> response = boardService.createBoard(boardRequestDto, multipartFiles);
        return response;
    }

    @Operation(
            summary = "게시글 목록 조회",
            description = "게시판 유형 및 필터에 따른 게시글 목록을 조회합니다."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "게시글 목록이 성공적으로 조회되었습니다.",
                    content = @Content(schema = @Schema(implementation = ResponseDto.class))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "잘못된 요청입니다.",
                    content = @Content(schema = @Schema())
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "서버 오류입니다.",
                    content = @Content(schema = @Schema())
            )
    })
    @GetMapping
    public ResponseEntity<ResponseDto<Page<BoardDto>>> getBoardsByType(
            @RequestParam("type") BoardType boardType,
            @RequestParam(value = "filter1", required = false) String filter1,
            @RequestParam(value = "filter2", required = false, defaultValue = "recent") String filter2,
            @RequestParam(value = "search", required = false) String search,
            @PageableDefault(size = 12) Pageable pageable,
            @RequestParam(value = "isDone", required = false) Boolean isDone) {

        ResponseEntity<ResponseDto<Page<BoardDto>>> responseEntity = boardService.getBoardsByType(boardType, filter1,
                filter2, search, pageable, isDone);

        // 게시글 목록은 5분 동안 캐시하도록 설정
        return ResponseEntity
                .status(responseEntity.getStatusCode())
                .headers(responseEntity.getHeaders())
                .header("Cache-Control", "public, max-age=300")  // 5분 동안 캐시
                .body(responseEntity.getBody());
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
            @PathVariable Long boardId) {

        ResponseEntity<ResponseDto> response = boardService.getBoardById(boardId);

        // 특정 게시글은 10분 동안 캐시하도록 설정
        return ResponseEntity
                .status(response.getStatusCode())
                .headers(response.getHeaders())
                .header("Cache-Control", "public, max-age=600")  // 10분 동안 캐시
                .body(response.getBody());
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
            @PathVariable("boardId") Long boardId,
            @RequestPart(name = "request") BoardRequestDto boardRequestDto,
            @RequestPart(name = "files", required = false) List<MultipartFile> multipartFiles,
            @RequestPart(name = "deleteFiles", required = false) List<String> deleteFiles)
            throws IOException {

        List<String> fileNamesToDelete = deleteFiles;

        ResponseEntity<ResponseDto> response = boardService.updateBoard(boardId, boardRequestDto, multipartFiles,
                fileNamesToDelete);
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
            @PathVariable("boardId") Long boardId,
            @RequestBody ReactionRequestDto reactionRequestDto) {

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
            @PathVariable Long reactionId,
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
            @PathVariable Long reactionId) {

        ResponseEntity<ResponseDto> response = reactionService.deleteReaction(reactionId);
        return response;
    }
}

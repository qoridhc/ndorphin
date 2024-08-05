package com.web.ndolphin.controller;

import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.vote.request.VoteRequestDto;
import com.web.ndolphin.service.interfaces.VoteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "투표 컨트롤러", description = "투표 API입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/boards/{boardId}/votes")
public class VoteController {

    private final VoteService voteService;

    @Operation(summary = "투표 추가", description = "새로운 투표를 추가합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "투표가 성공적으로 추가되었습니다.",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류입니다.",
            content = @Content(schema = @Schema()))
    })
    @PostMapping
    public ResponseEntity<ResponseDto> addVote(
        @Parameter(description = "추가할 투표의 정보", required = true)
        @RequestBody VoteRequestDto voteRequestDto) {

        ResponseEntity<ResponseDto> response = voteService.addVote(voteRequestDto);

        return response;
    }

    @Operation(summary = "투표 수정", description = "기존 투표를 수정합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "투표가 성공적으로 수정되었습니다.",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "404", description = "해당 투표를 찾을 수 없습니다.",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류입니다.",
            content = @Content(schema = @Schema()))
    })
    @PutMapping("/{voteId}")
    public ResponseEntity<ResponseDto> updateVote(
        @Parameter(description = "수정할 투표의 ID", required = true)
        @PathVariable Long voteId,
        @Parameter(description = "수정할 투표의 정보", required = true)
        @RequestBody VoteRequestDto voteRequestDto) {

        ResponseEntity<ResponseDto> response = voteService.updateVote(voteId, voteRequestDto);

        return response;
    }

    @Operation(summary = "투표 삭제", description = "기존 투표를 삭제합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "투표가 성공적으로 삭제되었습니다.",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "404", description = "해당 투표를 찾을 수 없습니다.",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류입니다.",
            content = @Content(schema = @Schema()))
    })
    @DeleteMapping("/{voteId}")
    public ResponseEntity<ResponseDto> deleteVote(
        @Parameter(description = "삭제할 투표의 ID", required = true)
        @PathVariable Long voteId) {

        ResponseEntity<ResponseDto> response = voteService.deleteVote(voteId);

        return response;
    }
}

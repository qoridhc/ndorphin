package com.web.ndolphin.controller;

import com.web.ndolphin.common.ResponseCode;
import com.web.ndolphin.common.ResponseMessage;
import com.web.ndolphin.dto.MainPage.response.MainPageResponseDto;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.board.response.OpinionBoardDetailResponseDto;
import com.web.ndolphin.dto.board.response.RelayBoardDetailResponseDto;
import com.web.ndolphin.dto.board.response.VoteBoardDetailResponseDto;
import com.web.ndolphin.dto.user.response.BestNResponseDto;
import com.web.ndolphin.service.interfaces.BoardService;
import com.web.ndolphin.service.interfaces.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StopWatch;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "메인 페이지 컨트롤러", description = "메인 페이지 API입니다.")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/main")
public class MainPageController {

    private final UserService userService;
    private final BoardService boardService;

    @Operation(summary = "메인 페이지 데이터 조회", description = "메인 페이지에 필요한 데이터를 조회합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "메인 페이지 데이터 조회 성공",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "500", description = "서버 오류",
            content = @Content(schema = @Schema()))
    })
    @Transactional(readOnly = true)
    @GetMapping
    public ResponseEntity<ResponseDto> getMainPageData() {

        StopWatch stopWatch = new StopWatch();
        stopWatch.start();

        String fixedPeriod = "daily";

        CompletableFuture<List<RelayBoardDetailResponseDto>> relayBoardsFuture =
            CompletableFuture.supplyAsync(() -> boardService.getRelayBoards(fixedPeriod));
        CompletableFuture<List<VoteBoardDetailResponseDto>> voteBoardsFuture =
            CompletableFuture.supplyAsync(() -> boardService.getVoteBoards(fixedPeriod));
        CompletableFuture<List<OpinionBoardDetailResponseDto>> opinionBoardsFuture =
            CompletableFuture.supplyAsync(() -> boardService.getOpinionBoards(fixedPeriod));
        CompletableFuture<List<BestNResponseDto>> bestNsFuture =
            CompletableFuture.supplyAsync(() -> userService.getSortedUsersByNPoint(false));

        MainPageResponseDto mainPageResponse = CompletableFuture.allOf(
            relayBoardsFuture, voteBoardsFuture, opinionBoardsFuture, bestNsFuture
        ).thenApply(v -> new MainPageResponseDto(
            relayBoardsFuture.join(), voteBoardsFuture.join(),
            opinionBoardsFuture.join(), bestNsFuture.join()
        )).join();

        ResponseDto<?> responseBody = new ResponseDto<>(ResponseCode.SUCCESS,
            ResponseMessage.SUCCESS, mainPageResponse);

        stopWatch.stop();
//        System.out.println(stopWatch.prettyPrint());
//        System.out.println("코드 실행 시간 (s): " + stopWatch.getTotalTimeSeconds());

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    @Operation(summary = "릴레이 데이터 조회", description = "지정된 기간 동안의 릴레이 게시판 데이터를 조회합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "릴레이 데이터 조회 성공",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류",
            content = @Content(schema = @Schema()))
    })
    @GetMapping("/relay")
    public ResponseEntity<ResponseDto> getRelayData(
        @Parameter(description = "릴레이 게시판 기간 (daily, weekly, monthly)", example = "daily", required = false)
        @RequestParam(value = "relayPeriod", defaultValue = "daily") String relayPeriod) {

        List<RelayBoardDetailResponseDto> relayBoards = boardService.getRelayBoards(relayPeriod);

        ResponseDto<?> responseBody = new ResponseDto<>(ResponseCode.SUCCESS,
            ResponseMessage.SUCCESS, relayBoards);

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    @Operation(summary = "밸런스 데이터 조회", description = "지정된 기간 동안의 밸런스 게시판 데이터를 조회합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "밸런스 데이터 조회 성공",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류",
            content = @Content(schema = @Schema()))
    })
    @GetMapping("/balance")
    public ResponseEntity<ResponseDto> getBalanceData(
        @Parameter(description = "밸런스 게시판 기간 (daily, weekly, monthly)", example = "daily", required = false)
        @RequestParam(value = "balancePeriod", defaultValue = "daily") String balancePeriod) {

        List<VoteBoardDetailResponseDto> voteBoards = boardService.getVoteBoards(balancePeriod);

        ResponseDto<?> responseBody = new ResponseDto<>(ResponseCode.SUCCESS,
            ResponseMessage.SUCCESS, voteBoards);

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    @Operation(summary = "만약에 데이터 조회", description = "지정된 기간 동안의 '만약에' 게시판 데이터를 조회합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "만약에 데이터 조회 성공",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류",
            content = @Content(schema = @Schema()))
    })
    @GetMapping("/if")
    public ResponseEntity<ResponseDto> getIfData(
        @Parameter(description = "만약에 게시판 기간 (daily, weekly, monthly)", example = "daily", required = false)
        @RequestParam(value = "ifPeriod", defaultValue = "daily") String ifPeriod) {

        List<OpinionBoardDetailResponseDto> opinionBoards = boardService.getOpinionBoards(ifPeriod);

        ResponseDto<?> responseBody = new ResponseDto<>(ResponseCode.SUCCESS,
            ResponseMessage.SUCCESS, opinionBoards);

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    @Operation(summary = "베스트N 데이터 조회", description = "베스트N 사용자 목록을 조회합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "베스트N 데이터 조회 성공",
            content = @Content(schema = @Schema(implementation = ResponseDto.class))),
        @ApiResponse(responseCode = "400", description = "잘못된 요청",
            content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "서버 오류",
            content = @Content(schema = @Schema()))
    })
    @GetMapping("/bestN")
    public ResponseEntity<ResponseDto> getBestNData(
        @Parameter(description = "베스트N 더보기 플래그 값 (true, false)", example = "false", required = false)
        @RequestParam(value = "flag", defaultValue = "false") boolean flag) {

        List<BestNResponseDto> bestNs = userService.getSortedUsersByNPoint(flag);

        ResponseDto<?> responseBody = new ResponseDto<>(ResponseCode.SUCCESS,
            ResponseMessage.SUCCESS, bestNs);

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}

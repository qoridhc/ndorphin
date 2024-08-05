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
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
public class MainPageController {

    private final UserService userService;
    private final BoardService boardService;

    // 메인 페이지 조회 API
    @GetMapping("/main")
    public ResponseEntity<ResponseDto> getMainPageData(
        @RequestParam(value = "relayPeriod", defaultValue = "daily") String relayPeriod,
        @RequestParam(value = "balancePeriod", defaultValue = "daily") String balancePeriod,
        @RequestParam(value = "ifPeriod", defaultValue = "daily") String ifPeriod,
        @RequestParam(value = "flag", defaultValue = "false") boolean flag) {

        List<RelayBoardDetailResponseDto> relayBoards = boardService.getRelayBoards(relayPeriod);
        List<VoteBoardDetailResponseDto> voteBoards = boardService.getVoteBoards(balancePeriod);
        List<OpinionBoardDetailResponseDto> opinionBoards = boardService.getOpinionBoards(ifPeriod);
        List<BestNResponseDto> bestNs = userService.getSortedUsersByNPoint(flag);


        MainPageResponseDto mainPageResponse = new MainPageResponseDto(relayBoards, voteBoards, opinionBoards, bestNs);
        ResponseDto<?> responseBody = new ResponseDto<>(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, mainPageResponse);

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}

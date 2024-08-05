package com.web.ndolphin.dto.MainPage.response;

import com.web.ndolphin.dto.board.response.OpinionBoardDetailResponseDto;
import com.web.ndolphin.dto.board.response.RelayBoardDetailResponseDto;
import com.web.ndolphin.dto.board.response.VoteBoardDetailResponseDto;
import com.web.ndolphin.dto.user.response.BestNResponseDto;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MainPageResponseDto {

    List<RelayBoardDetailResponseDto> relayBoards;
    List<VoteBoardDetailResponseDto> voteBoards;
    List<OpinionBoardDetailResponseDto> opinionBoards;
    List<BestNResponseDto> bestNs;

    public MainPageResponseDto(List<RelayBoardDetailResponseDto> relayBoards,
        List<VoteBoardDetailResponseDto> voteBoards,
        List<OpinionBoardDetailResponseDto> opinionBoards, List<BestNResponseDto> bestNs) {
        this.relayBoards = relayBoards;
        this.voteBoards = voteBoards;
        this.opinionBoards = opinionBoards;
        this.bestNs = bestNs;
    }
}

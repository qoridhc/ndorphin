package com.web.ndolphin.dto.board.response;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VoteBoardDetailResponseDto extends BoardDto {

    private long totalVoteCnt;
    private List<String> voteContents;
}

package com.web.ndolphin.dto.board.response;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VoteBoardResponseDto extends BoardDto {

    private long totalVoteCnt;
    private List<String> voteContents;
}

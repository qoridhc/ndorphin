package com.web.ndolphin.dto.board.response;

import com.web.ndolphin.dto.vote.VoteInfo;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VoteBoardDetailResponseDto extends BoardDto {

    private List<VoteInfo> voteInfos;
    private Long userVoteId;
    private Long userVoteContentId;
}

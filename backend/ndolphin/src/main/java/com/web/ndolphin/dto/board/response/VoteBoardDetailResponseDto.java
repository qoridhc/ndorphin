package com.web.ndolphin.dto.board.response;

import com.web.ndolphin.domain.ReactionType;
import com.web.ndolphin.dto.vote.VoteInfo;
import java.util.List;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VoteBoardDetailResponseDto extends BoardDto {

    private String contentFileUrl;
    private String avatarUrl;
    private Map<ReactionType, Long> reactionTypeCounts;
    private List<VoteInfo> voteInfos;
    private Long userVoteId;
    private Long userVoteContentId;
    private Long userReactionId;
    private ReactionType userReactionType;
}

package com.web.ndolphin.dto.vote.response;

import com.web.ndolphin.dto.vote.VoteInfo;
import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class VoteResponseDto {

    private final Long voteId;
    private final List<VoteInfo> voteInfos;
}

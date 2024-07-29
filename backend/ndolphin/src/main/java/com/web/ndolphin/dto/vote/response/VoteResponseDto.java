package com.web.ndolphin.dto.vote.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class VoteResponseDto {

    private final Long voteContentId;
    private final Long voteCount;
}

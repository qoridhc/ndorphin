package com.web.ndolphin.dto.voteContent;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class UserVoteContent {

    private final Long voteId;
    private final Long voteContentId;
}

package com.web.ndolphin.mapper;

import com.web.ndolphin.domain.User;
import com.web.ndolphin.domain.Vote;
import com.web.ndolphin.domain.VoteContent;
import com.web.ndolphin.dto.vote.VoteInfo;
import com.web.ndolphin.dto.vote.request.VoteRequestDto;
import com.web.ndolphin.dto.vote.response.VoteResponseDto;
import java.util.List;

public class VoteMapper {

    public static VoteResponseDto toDto(Vote vote, List<VoteInfo> voteInfos) {

        VoteResponseDto voteResponseDto = new VoteResponseDto(vote.getId(), voteInfos);

        return voteResponseDto;
    }

    public static Vote toEntity(VoteRequestDto voteRequestDto, User user, VoteContent voteContent) {

        Vote vote = new Vote();

        vote.setUser(user);
        vote.setVoteContent(voteContent);

        return vote;
    }

}

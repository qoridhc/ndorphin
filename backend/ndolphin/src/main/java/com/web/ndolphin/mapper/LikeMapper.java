package com.web.ndolphin.mapper;

import com.web.ndolphin.domain.Comment;
import com.web.ndolphin.domain.Likes;
import com.web.ndolphin.domain.User;

public class LikeMapper {

//    public static VoteResponseDto toDto(Vote vote, List<VoteCount> voteCounts) {
//
//        VoteResponseDto voteResponseDto = new VoteResponseDto(vote.getId(), voteCounts);
//
//        return voteResponseDto;
//    }

    public static Likes toEntity(User user, Comment comment) {

        Likes like = new Likes();

        like.setUser(user);
        like.setComment(comment);

        return like;
    }
}

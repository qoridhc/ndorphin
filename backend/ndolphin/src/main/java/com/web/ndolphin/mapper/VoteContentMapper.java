package com.web.ndolphin.mapper;

import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.VoteContent;

public class VoteContentMapper {

    public static VoteContent toEntity(Board board, String content) {

        VoteContent voteContent = new VoteContent();

        voteContent.setBoard(board);
        voteContent.setContent(content);

        return voteContent;
    }
}

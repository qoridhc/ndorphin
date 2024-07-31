package com.web.ndolphin.mapper;

import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.Comment;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.comment.CommentRequestDto;
import com.web.ndolphin.dto.comment.CommentResponseDto;

public class CommentMapper {

    public static CommentResponseDto toDto(Comment comment, Long loveCnt, String url) {

        CommentResponseDto commentResponseDto = new CommentResponseDto();

        commentResponseDto.setCommentId(comment.getId());
        commentResponseDto.setNickName(comment.getUser().getNickName());
        commentResponseDto.setContent(comment.getContent());
        commentResponseDto.setLikeCnt(loveCnt);
        commentResponseDto.setFileUrl(url);
        commentResponseDto.setCreatedAt(comment.getCreatedAt());
        commentResponseDto.setUpdatedAt(comment.getUpdatedAt());

        return commentResponseDto;
    }

    public static Comment toEntity(CommentRequestDto dto, User user, Board board) {

        Comment comment = new Comment();

        comment.setUser(user);
        comment.setBoard(board);
        comment.setContent(dto.getContent());

        return comment;
    }
}


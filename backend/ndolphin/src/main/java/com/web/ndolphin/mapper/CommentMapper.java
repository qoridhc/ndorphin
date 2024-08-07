package com.web.ndolphin.mapper;

import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.Comment;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.comment.CommentRequestDto;
import com.web.ndolphin.dto.comment.CommentResponseDto;
import com.web.ndolphin.dto.user.UserDto;

public class CommentMapper {

    public static CommentResponseDto toDto(Comment comment, Long likeCnt, boolean isLiked,
        UserDto userDto, String contentFileUrl) {

        CommentResponseDto commentResponseDto = new CommentResponseDto();

        commentResponseDto.setCommentId(comment.getId());
        commentResponseDto.setContent(comment.getContent());
        commentResponseDto.setUser(userDto);
        commentResponseDto.setLikeCnt(likeCnt);
        commentResponseDto.setLikedByUser(isLiked);
        commentResponseDto.setContentFileUrl(contentFileUrl);
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


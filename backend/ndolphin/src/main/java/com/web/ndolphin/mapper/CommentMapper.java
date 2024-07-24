package com.web.ndolphin.mapper;

import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.Comment;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.comment.CommentRequestDto;
import com.web.ndolphin.dto.comment.CommentResponseDto;

public class CommentMapper {

    public static CommentResponseDto toDto(Comment comment) {

        CommentResponseDto commentResponseDto = new CommentResponseDto();

//        commentResponseDto.setId(comment.getId());
//        commentResponseDto.setBoardId(comment);
//        commentResponseDto.setUser(user);
//        commentResponseDto.setContent(dto.getContent());

        return commentResponseDto;
    }

    public static Comment toEntity(CommentRequestDto dto, Board board, User user) {

        Comment comment = new Comment();

        comment.setId(dto.getId());
        comment.setBoard(board);
        comment.setUser(user);
        comment.setContent(dto.getContent());

        return comment;
    }
}


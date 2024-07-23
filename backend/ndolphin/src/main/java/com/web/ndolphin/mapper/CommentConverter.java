package com.web.ndolphin.mapper;

import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.Comment;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.comment.CommentDto;

public class CommentConverter {

    // 엔티티를 Dto로 변환하는 메서드
    public static CommentDto convertToDto(Comment comment) {
        CommentDto dto = new CommentDto();
        dto.setId(comment.getId());
        dto.setBoardId(comment.getBoard().getId());
        dto.setUserId(comment.getUser().getUserId());
        dto.setContent(comment.getContent());
        dto.setCreatedAt(comment.getCreatedAt());
        dto.setUpdatedAt(comment.getUpdatedAt());
        return dto;
    }

    // Dto를 엔티티로 변환하는 메서드
    public static Comment convertToEntity(CommentDto dto, Board board, User user) {
        Comment comment = new Comment();
        comment.setId(dto.getId());
        comment.setBoard(board);
        comment.setUser(user);
        comment.setContent(dto.getContent());
        comment.setCreatedAt(dto.getCreatedAt());
        comment.setUpdatedAt(dto.getUpdatedAt());
        return comment;
    }
}


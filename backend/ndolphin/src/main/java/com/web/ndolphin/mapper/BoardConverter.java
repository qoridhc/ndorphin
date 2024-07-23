package com.web.ndolphin.mapper;

import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.BoardType;
import com.web.ndolphin.domain.Comment;
import com.web.ndolphin.dto.board.BoardDto;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.board.request.BoardUpdateRequestDto;

import java.util.List;
import java.util.stream.Collectors;

public class BoardConverter {

    // 엔티티를 Dto로 변환하는 메서드
    public static BoardDto convertToDto(Board board) {
        BoardDto dto = new BoardDto();

        dto.setId(board.getId());
        dto.setUserId(board.getUser().getUserId());
        dto.setSubject(board.getSubject());
        dto.setContent(board.getContent());
        dto.setSummary(board.getSummary());
        dto.setHit(board.getHit());
        dto.setBoardType(board.getBoardType().toString());
        dto.setCreatedAt(board.getCreatedAt());
        dto.setUpdatedAt(board.getUpdatedAt());
        dto.setComments(board.getComments().stream()
                .map(CommentConverter::convertToDto)
                .collect(Collectors.toList()));
        return dto;
    }

    // Dto를 엔티티로 변환하는 메서드
    public static Board convertToEntity(BoardUpdateRequestDto dto, User user) {
        Board board = new Board();

//        board.setId(dto.getId());
        board.setUser(user);
        board.setSubject(dto.getSubject());
        board.setContent(dto.getContent());
//        board.setSummary(dto.getSummary());
//        board.setHit(dto.getHit());
        board.setBoardType(BoardType.valueOf(dto.getBoardType()));
//        board.setCreatedAt(dto.getCreatedAt());
//        board.setUpdatedAt(dto.getUpdatedAt());

        /*if (dto.getComments() != null) {
            List<Comment> comments = dto.getComments().stream()
                    .map(commentDto -> CommentConverter.convertToEntity(commentDto, board, user))
                    .collect(Collectors.toList());
            board.setComments(comments);
        }*/
        return board;
    }
}

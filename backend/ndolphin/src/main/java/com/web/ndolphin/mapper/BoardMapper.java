package com.web.ndolphin.mapper;

import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.board.BoardDto;
import com.web.ndolphin.dto.board.response.ByeBoardDto;

public class BoardMapper {

    // Entity -> DTO 변환
    public static ByeBoardDto ToByeBoardDto(Board board) {

        ByeBoardDto dto = new ByeBoardDto();

        dto.setId(board.getId());
        dto.setUserId(board.getUser().getUserId());
        dto.setSubject(board.getSubject());
        dto.setContent(board.getContent());
        dto.setSummary(board.getSummary());
        dto.setHit(board.getHit());
        dto.setBoardType(board.getBoardType());
        dto.setCreatedAt(board.getCreatedAt());
        dto.setCreatedAt(board.getUpdatedAt());
        return dto;
    }

//    public static ByeBoardDto ToDto(Board board, ) {
//
//        ByeBoardDto dto = new ByeBoardDto();
//
//        dto.setId(board.getId());
//        dto.setUserId(board.getUser().getUserId());
//        dto.setSubject(board.getSubject());
//        dto.setContent(board.getContent());
//        dto.setSummary(board.getSummary());
//        dto.setBoardType(board.getBoardType());
//        dto.setCreatedAt(board.getCreatedAt());
//        dto.setCreatedAt(board.getUpdatedAt());
//
//        return dto;
//    }

    // DTO -> Entity 변환
    public static Board ToEntity(User user, BoardDto dto) {

        Board board = new Board();

        board.setUser(user);
        board.setSubject(dto.getSubject());
        board.setContent(dto.getContent());
//        board.setSummary(dto.getSummary()); TODO: AI
//        board.setHit(dto.getHit());
        board.setBoardType(dto.getBoardType());
        board.setCreatedAt(dto.getCreatedAt());
        board.setUpdatedAt(dto.getUpdatedAt());
        return board;
    }
}

package com.web.ndolphin.mapper;

import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.board.BoardDto;
import com.web.ndolphin.dto.board.response.ByeBoardDto;
import com.web.ndolphin.dto.board.response.OkBoardDto;
import java.util.List;

public class BoardMapper {

    // 공통된 Entity -> DTO 변환 로직
    private static void mapCommonFields(Board board, BoardDto dto) {
        dto.setId(board.getId());
        dto.setUserId(board.getUser().getUserId());
        dto.setSubject(board.getSubject());
        dto.setContent(board.getContent());
        dto.setSummary(board.getSummary());
        dto.setHit(board.getHit());
        dto.setBoardType(board.getBoardType());
        dto.setCreatedAt(board.getCreatedAt());
        dto.setUpdatedAt(board.getUpdatedAt());
    }

    // Entity -> BoardDto 변환
    public static BoardDto toBoardDto(Board board) {
        BoardDto dto = new BoardDto();
        mapCommonFields(board, dto);
        return dto;
    }

    // Entity -> ByeBoardDto 변환
    public static ByeBoardDto toByeBoardDto(Board board) {
        ByeBoardDto dto = new ByeBoardDto();
        mapCommonFields(board, dto);
        return dto;
    }

    // Entity -> OkBoardDto 변환
    public static OkBoardDto toOkBoardDto(Board board, List<String> fileNames, List<String> fileUrls) {

        OkBoardDto dto = new OkBoardDto();
        mapCommonFields(board, dto);
        dto.setFileNames(fileNames);
        dto.setFileUrls(fileUrls);
        return dto;
    }

    // DTO -> Entity 변환
    public static Board toEntity(BoardDto dto, User user) {

        Board board = new Board();
        board.setId(dto.getId());
        board.setUser(user);
        board.setSubject(dto.getSubject());
        board.setContent(dto.getContent());
        board.setSummary(dto.getSummary()); // TODO:
        board.setHit(dto.getHit());
        board.setBoardType(dto.getBoardType());
        board.setCreatedAt(dto.getCreatedAt());
        board.setUpdatedAt(dto.getUpdatedAt());
        return board;
    }
}

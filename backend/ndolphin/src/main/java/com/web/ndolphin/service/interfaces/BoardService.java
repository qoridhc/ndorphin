package com.web.ndolphin.service.interfaces;

import com.web.ndolphin.domain.BoardType;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.board.request.BoardRequestDto;
import com.web.ndolphin.dto.board.response.OpinionBoardDetailResponseDto;
import com.web.ndolphin.dto.board.response.RelayBoardDetailResponseDto;
import com.web.ndolphin.dto.board.response.VoteBoardDetailResponseDto;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface BoardService {

    ResponseEntity<ResponseDto> createBoard(Long userId, BoardRequestDto boardRequestDto,
        List<MultipartFile> multipartFiles);

    ResponseEntity<ResponseDto> getBoardsByType(BoardType boardType, String filter1, String filter2, String search);

    ResponseEntity<ResponseDto> getBoardById(Long boardId);

    ResponseEntity<ResponseDto> updateBoard(Long boardId, BoardRequestDto boardRequestDto,
        List<MultipartFile> multipartFiles, List<String> fileNamesToDelete);

    ResponseEntity<ResponseDto> deleteBoard(Long boardId);

    List<RelayBoardDetailResponseDto> getRelayBoards(String period);
    List<VoteBoardDetailResponseDto> getVoteBoards(String period);
    List<OpinionBoardDetailResponseDto> getOpinionBoards(String period);
}
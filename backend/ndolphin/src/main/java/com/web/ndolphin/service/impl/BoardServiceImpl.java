package com.web.ndolphin.service.impl;

import com.web.ndolphin.common.ResponseCode;
import com.web.ndolphin.common.ResponseMessage;
import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.BoardType;
import com.web.ndolphin.domain.EntityType;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.board.BoardDto;
import com.web.ndolphin.dto.board.request.BoardRequestDto;
import com.web.ndolphin.mapper.BoardConverter;
import com.web.ndolphin.repository.BoardRepository;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.service.BoardService;
import com.web.ndolphin.service.FileInfoService;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Slf4j
public class BoardServiceImpl implements BoardService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final FileInfoService fileInfoService;

    @Override
    public ResponseEntity<ResponseDto> createBoard(Long userId, BoardRequestDto boardRequestDto,
        List<MultipartFile> multipartFiles) {

        // User 객체를 조회
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            return ResponseDto.validationFail();
        }
        User user = optionalUser.get();

        // 게시판 타입에 따른 분기 처리
        /*        switch (BoardType.valueOf(boardUpdateRequestDto.getBoardType())) {
            case VOTE_BOARD:
                // 투표 게시판 - 이미지 첨부 가능
                break;
            case OPINION_BOARD:
                // 의견 게시판 - 댓글 가능
                break;
            case RELAY_BOARD:
                // 릴레이 게시판 - 댓글 및 이미지 첨부 가능
                break;
            case OK_BOARD:
                // 괜찮아 게시판 - 댓글 가능
                break;
            case BYE_BOARD:
                // 작별 게시판 - 댓글 및 이미지 첨부 가능
                break;
            default:
                return ResponseDto.validationFail();
        }*/

        // 게시글 처리
        Board board = BoardConverter.convertToEntity(user, boardRequestDto);
        board = boardRepository.save(board);

        // 파일 업로드 처리
        if (multipartFiles != null && !multipartFiles.isEmpty()) {
            try {
                fileInfoService.uploadAndSaveFiles(board.getId(), EntityType.POST, multipartFiles);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        return ResponseDto.success();
    }

    @Override
    public ResponseEntity<ResponseDto> getBoardsByType(BoardType boardType) {
        List<Board> boards = boardRepository.findByBoardType(boardType);
        List<BoardDto> boardDtos = new ArrayList<>();

        for (Board board : boards) {
            BoardDto boardDto = BoardConverter.convertToDto(board);
            boardDtos.add(boardDto);
        }

        ResponseDto<?> responseBody = new ResponseDto<>(ResponseCode.SUCCESS, ResponseMessage.SUCCESS,
            boardDtos);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    @Override
    public ResponseEntity<ResponseDto> getBoardById(Long boardId) {
        Optional<Board> optionalBoard = boardRepository.findById(boardId);

        if (optionalBoard.isEmpty()) {
            return ResponseDto.databaseError();
        }

        Board board = optionalBoard.get();
        BoardDto boardDto = BoardConverter.convertToDto(board);
        ResponseDto<BoardDto> responseBody = new ResponseDto<>(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, boardDto);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    @Override
    public ResponseEntity<ResponseDto> updateBoard(Long boardId, BoardRequestDto boardRequestDto) {
        // 기존 엔티티를 가져오기
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        if (optionalBoard.isEmpty()) {
            return ResponseDto.databaseError();
        }
        Board existingBoard = optionalBoard.get();

        existingBoard.setSubject(boardRequestDto.getSubject());
        existingBoard.setContent(boardRequestDto.getContent());
        existingBoard.setUpdatedAt(LocalDateTime.now());

        boardRepository.save(existingBoard);

        // 파일 업로드 처리
//        List<MultipartFile> files = boardUpdateRequestDto.getFiles();
//        if (files != null && !files.isEmpty()) {
//            try {
//                fileInfoService.uploadAndSaveFiles(files, existingBoard);
//            } catch (IOException e) {
//                throw new RuntimeException(e);
//            }
//        }

        BoardDto boardDto = BoardConverter.convertToDto(existingBoard);
        ResponseDto<BoardDto> responseBody = new ResponseDto<>(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, boardDto);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    @Override
    public ResponseEntity<ResponseDto> deleteBoard(Long boardId) {

        // 게시글 삭제
        boardRepository.deleteById(boardId);

        // 파일 삭제
        try {
            fileInfoService.deleteAndDeleteFiles(boardId, EntityType.POST);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return ResponseDto.success();
    }
}

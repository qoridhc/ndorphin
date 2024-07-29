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
import com.web.ndolphin.dto.board.response.ByeBoardDto;
import com.web.ndolphin.dto.board.response.OkBoardDto;
import com.web.ndolphin.dto.file.response.FileInfoResponseDto;
import com.web.ndolphin.mapper.BoardMapper;
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
        switch (BoardType.valueOf(String.valueOf(boardRequestDto.getBoardType()))) {
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
        }

        // 게시글 처리
        Board board = new Board();
        board.setUser(user);
        board.setSubject(boardRequestDto.getSubject());
        board.setContent(boardRequestDto.getContent());
        // TODO: summary -> AI 처리
        board.setHit(0);
        board.setBoardType(boardRequestDto.getBoardType());
        board.setCreatedAt(LocalDateTime.now());
        board.setUpdatedAt(LocalDateTime.now());
        boardRepository.save(board);

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

        ResponseDto<?> responseBody = null;

        List<Board> boards = boardRepository.findByBoardType(boardType);

        switch (boardType) {
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
                List<OkBoardDto> okBoardDtos = new ArrayList<>();
                for (Board board : boards) {
                    // 파일 정보를 가져오기
                    List<FileInfoResponseDto> fileInfoResponseDtos = fileInfoService.getFileInfos(board.getId());

                    // 파일명과 파일 URL 리스트 생성
                    List<String> fileNames = new ArrayList<>();
                    List<String> fileUrls = new ArrayList<>();

                    for (FileInfoResponseDto fileInfoResponseDto : fileInfoResponseDtos) {
                        fileNames.add(fileInfoResponseDto.getFileName());
                        fileUrls.add(fileInfoResponseDto.getFileUrl());
                    }

                    // Board와 파일 정보를 사용하여 OkBoardDto 생성
                    OkBoardDto okBoardDto = BoardMapper.toOkBoardDto(board, fileNames, fileUrls);
                    okBoardDtos.add(okBoardDto);
                }
                responseBody = new ResponseDto<>(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, okBoardDtos);
                break;
            case BYE_BOARD:
                // 작별 게시판
                List<ByeBoardDto> byeBoardDtos = new ArrayList<>();
                for (Board board : boards) {
                    ByeBoardDto byeBoardDto = BoardMapper.toByeBoardDto(board);
                    byeBoardDtos.add(byeBoardDto);
                }
                responseBody = new ResponseDto<>(ResponseCode.SUCCESS, ResponseMessage.SUCCESS,
                    byeBoardDtos);
                break;
            default:
                return ResponseDto.validationFail();
        }
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    @Override
    public ResponseEntity<ResponseDto> getBoardById(Long boardId) {

        ResponseDto<BoardDto> responseBody = null;

        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        if (optionalBoard.isEmpty()) {
            return ResponseDto.databaseError();
        }
        Board board = optionalBoard.get();

        board.setHit(board.getHit() + 1);
        boardRepository.save(board);

        switch (board.getBoardType()) {
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
                List<FileInfoResponseDto> fileInfoResponseDtos = fileInfoService.getFileInfos(boardId);

                // 파일명과 파일 URL 리스트 생성
                List<String> fileNames = new ArrayList<>();
                List<String> fileUrls = new ArrayList<>();

                for (FileInfoResponseDto fileInfoResponseDto : fileInfoResponseDtos) {
                    fileNames.add(fileInfoResponseDto.getFileName());
                    fileUrls.add(fileInfoResponseDto.getFileUrl());
                }

                // Board와 파일 정보를 사용하여 OkBoardDto 생성
                OkBoardDto okBoardDto = BoardMapper.toOkBoardDto(board, fileNames, fileUrls);
                responseBody = new ResponseDto<>(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, okBoardDto);
                break;
            case BYE_BOARD:
                // 작별 게시판
                ByeBoardDto byeBoardDto = BoardMapper.toByeBoardDto(board);
                responseBody = new ResponseDto<>(ResponseCode.SUCCESS, ResponseMessage.SUCCESS,
                    byeBoardDto);
                break;
            default:
                return ResponseDto.validationFail();
        }
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    @Override
    public ResponseEntity<ResponseDto> updateBoard(Long boardId, BoardRequestDto boardRequestDto,
        List<MultipartFile> multipartFiles, List<String> fileNamesToDelete) {

        // 게시글 처리
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        if (optionalBoard.isEmpty()) {
            return ResponseDto.databaseError();
        }
        Board existingBoard = optionalBoard.get();
        existingBoard.setSubject(boardRequestDto.getSubject());
        existingBoard.setContent(boardRequestDto.getContent());
        existingBoard.setHit(existingBoard.getHit() + 1);
        existingBoard.setUpdatedAt(LocalDateTime.now());
        boardRepository.save(existingBoard);

        // 2. 파일들 삭제
        // TODO:
        if (fileNamesToDelete != null && !fileNamesToDelete.isEmpty()) {
            try {
                fileInfoService.deleteAndDeleteFiles(boardId, EntityType.POST, fileNamesToDelete);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        // 3. 새 파일들 추가
        // TODO:
        if (multipartFiles != null && !multipartFiles.isEmpty()) {
            try {
                fileInfoService.uploadAndSaveFiles(boardId, EntityType.POST, multipartFiles);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        return ResponseDto.success();
    }

    @Override
    public ResponseEntity<ResponseDto> deleteBoard(Long boardId) {

        try {
            // 유효한 boardId 확인
            Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid board ID"));

            // 게시글 삭제
            boardRepository.delete(board);

            // 파일 삭제
            fileInfoService.deleteAndDeleteFiles(boardId, EntityType.POST);

            return ResponseDto.success(); // 성공 시 응답
        } catch (IllegalArgumentException e) {
            return ResponseDto.validationFail(); // 유효하지 않은 boardId 에러 응답
        } catch (Exception e) {
            return ResponseDto.databaseError(); // 기타 예외 발생 시 데이터베이스 에러 응답
        }
    }
}

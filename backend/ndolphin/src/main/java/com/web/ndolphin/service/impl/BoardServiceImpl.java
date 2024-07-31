package com.web.ndolphin.service.impl;

import com.web.ndolphin.common.ResponseCode;
import com.web.ndolphin.common.ResponseMessage;
import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.BoardType;
import com.web.ndolphin.domain.EntityType;
import com.web.ndolphin.domain.Reaction;
import com.web.ndolphin.domain.ReactionType;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.board.request.BoardRequestDto;
import com.web.ndolphin.dto.board.response.BoardDto;
import com.web.ndolphin.dto.board.response.ByeBoardDto;
import com.web.ndolphin.dto.board.response.OkBoardDto;
import com.web.ndolphin.dto.board.response.OpinionBoardResponseDto;
import com.web.ndolphin.dto.board.response.RelayBoardResponseDto;
import com.web.ndolphin.dto.board.response.VoteBoardResponseDto;
import com.web.ndolphin.dto.file.response.FileInfoResponseDto;
import com.web.ndolphin.dto.reaction.response.ReactionSummaryDto;
import com.web.ndolphin.dto.vote.VoteCount;
import com.web.ndolphin.mapper.BoardMapper;
import com.web.ndolphin.repository.BoardRepository;
import com.web.ndolphin.repository.CommentRepository;
import com.web.ndolphin.repository.FavoriteRepository;
import com.web.ndolphin.repository.ReactionRepository;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.service.interfaces.BoardService;
import com.web.ndolphin.service.interfaces.CommentService;
import com.web.ndolphin.service.interfaces.FileInfoService;
import com.web.ndolphin.service.interfaces.ReactionService;
import com.web.ndolphin.service.interfaces.VoteService;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    private final CommentRepository commentRepository;
    private final FavoriteRepository favoriteRepository;
    private final FileInfoService fileInfoService;
    private final ReactionService reactionService;
    private final VoteService voteService;
    private final CommentService commentService;
    private final ReactionRepository reactionRepository;

    @Override
    public ResponseEntity<ResponseDto> createBoard(Long userId, BoardRequestDto boardRequestDto,
        List<MultipartFile> multipartFiles) {

        try {
            User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));

            Board board = BoardMapper.toEntity(boardRequestDto, user);

            // 게시글 처리
            boardRepository.save(board);

            // 파일 업로드 처리
            fileInfoService.uploadFiles(board.getId(), EntityType.POST, multipartFiles);

            return ResponseDto.success();
        } catch (Exception e) {
            return ResponseDto.databaseError(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<ResponseDto> getBoardsByType(BoardType boardType) {
        log.info("boardType = {}", boardType);
        ResponseDto<?> responseBody = null;

        List<Board> boards = boardRepository.findByBoardType(boardType);

        switch (boardType) {
            case VOTE_BOARD:
                // 총 투표 수(투표 항목들의 투표 합), 투표 목록
                List<VoteBoardResponseDto> voteBoardResponseDtos = boards.stream()
                    .map(board -> {
                        Long boardId = board.getId();

                        String avatarUrl = fileInfoService.getFileUrl(board.getUser().getUserId(),
                            EntityType.USER);

                        List<VoteCount> voteCounts = voteService.getVoteContents(boardId);

                        // 모든 투표의 합 계산
                        long totalVotes = voteCounts.stream()
                            .mapToLong(VoteCount::getVoteCount)
                            .sum();

                        // VoteContent의 content만 모음
                        List<String> voteContents = voteCounts.stream()
                            .map(VoteCount::getVoteContent)
                            .collect(Collectors.toList());

                        return BoardMapper.toVoteBoardResponseDto(board, voteContents, totalVotes,
                            avatarUrl);
                    })
                    .collect(Collectors.toList());

                responseBody = new ResponseDto<>(ResponseCode.SUCCESS, ResponseMessage.SUCCESS,
                    voteBoardResponseDtos);
                break;
            case OPINION_BOARD:
                // 총 댓글 수, 가장 좋아요를 많이 받은 댓글(좋아요 개수가 같으면 최신순)
                List<OpinionBoardResponseDto> opinionBoardResponseDtos = boards.stream()
                    .map(board -> {
                        Long boardId = board.getId();

                        String avatarUrl = fileInfoService.getFileUrl(board.getUser().getUserId(),
                            EntityType.USER);

                        Pageable pageable = PageRequest.of(0, 1);
                        List<String> bestComments = commentRepository.findTopCommentContentByLikes(
                            boardId, pageable);

                        String bestComment = bestComments.isEmpty() ? null : bestComments.get(0);

                        Long commentCount = commentRepository.countCommentsByBoardId(boardId);

                        return BoardMapper.toOpinionBoardResponseDto(board, bestComment,
                            commentCount, avatarUrl);
                    })
                    .collect(Collectors.toList());

                responseBody = new ResponseDto<>(ResponseCode.SUCCESS, ResponseMessage.SUCCESS,
                    opinionBoardResponseDtos);
                break;
            case RELAY_BOARD:
                // 요약, 사진, 참여 여부, 관심 여부
                List<RelayBoardResponseDto> relayBoardResponseDto = boards.stream()
                    .map(board -> {
                        Long boardId = board.getId();

                        String thumbNailUrl = fileInfoService.getFileUrl(
                            board.getUser().getUserId(),
                            EntityType.POST);

                        boolean hasParticipated = commentRepository.existsByBoardIdAndUserId(
                            boardId, board.getUser().getUserId());

                        boolean isFavorite = favoriteRepository.existsByBoardIdAndUserId(
                            boardId, board.getUser().getUserId());

                        return BoardMapper.toRelayBoardResponseDto(board, hasParticipated,
                            isFavorite, thumbNailUrl);
                    })
                    .collect(Collectors.toList());

                responseBody = new ResponseDto<>(ResponseCode.SUCCESS, ResponseMessage.SUCCESS,
                    relayBoardResponseDto);

                break;
            case OK_BOARD:
                // 댓글 수, 사진
                List<OkBoardDto> okBoardDtos = new ArrayList<>();
                for (Board board : boards) {
                    // 파일 정보를 가져오기
                    List<FileInfoResponseDto> fileInfoResponseDtos = fileInfoService.getFileInfos(
                        board.getId(), EntityType.POST);

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
                responseBody = new ResponseDto<>(ResponseCode.SUCCESS, ResponseMessage.SUCCESS,
                    okBoardDtos);
                break;
            case BYE_BOARD:
                // (welcome, bye)각각의 반응 수, 반응 했는지, 어디에서 어디로 바뀌었는지

                List<ByeBoardDto> byeBoardDtos = new ArrayList<>();
                for (Board board : boards) {

                    // 각 게시글의 반응 수를 조회
                    Map<ReactionType, Long> reactionTypeCounts = getReactionTypeCounts(board.getId());

                    // 사용자의 반응 조회
                    Reaction userReaction = reactionRepository.findByBoardIdAndUserId(board.getId(), board.getUser().getUserId());

                    ByeBoardDto byeBoardDto = BoardMapper.toByeBoardDto(board, reactionTypeCounts, userReaction);

                    byeBoardDtos.add(byeBoardDto);
                }
                responseBody = new ResponseDto<>(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, byeBoardDtos);
                break;
            default:
                return ResponseDto.validationFail();
        }
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    private Map<ReactionType, Long> getReactionTypeCounts(Long boardId) {

        List<Object[]> results = reactionRepository.countByBoardIdGroupByReactionType(boardId);

        Map<ReactionType, Long> reactionTypeCounts = results.stream()
            .filter(result -> result[0] != null)
            .collect(Collectors.toMap(
                result -> (ReactionType) result[0],
                result -> (Long) result[1]
            ));
        
        return reactionTypeCounts;
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
                List<FileInfoResponseDto> fileInfoResponseDtos = fileInfoService.getFileInfos(
                    boardId, EntityType.POST);

                // 파일명과 파일 URL 리스트 생성
                List<String> fileNames = new ArrayList<>();
                List<String> fileUrls = new ArrayList<>();

                for (FileInfoResponseDto fileInfoResponseDto : fileInfoResponseDtos) {
                    fileNames.add(fileInfoResponseDto.getFileName());
                    fileUrls.add(fileInfoResponseDto.getFileUrl());
                }

                // Board와 파일 정보를 사용하여 OkBoardDto 생성
                OkBoardDto okBoardDto = BoardMapper.toOkBoardDto(board, fileNames, fileUrls);
                responseBody = new ResponseDto<>(ResponseCode.SUCCESS, ResponseMessage.SUCCESS,
                    okBoardDto);

                // 반응 정보 조회
                ResponseEntity<ResponseDto> reactionResponse = reactionService.getReactionsByBoardId(
                    boardId);
                if (reactionResponse.getBody().getCode() == ResponseCode.SUCCESS) {
                    ReactionSummaryDto reactionSummary = (ReactionSummaryDto) reactionResponse.getBody()
                        .getData();
                    okBoardDto.setReactionTypeCounts(
                        reactionSummary.getReactionTypeCounts()); // 추가된 부분
                }

                okBoardDto.setCommentResponseDtos(commentService.getBoardDetail(boardId));

                responseBody = new ResponseDto<>(ResponseCode.SUCCESS, ResponseMessage.SUCCESS,
                    okBoardDto);
                break;
            case BYE_BOARD:
                // 작별 게시판
//                ByeBoardDto byeBoardDto = BoardMapper.toByeBoardDto(board);
//                responseBody = new ResponseDto<>(ResponseCode.SUCCESS, ResponseMessage.SUCCESS,
//                    byeBoardDto);

                // 반응 정보 조회
//                ResponseEntity<ResponseDto> reactionResponse2 = reactionService.getReactionsByBoardId(
//                    boardId);
//                if (reactionResponse2.getBody().getCode() == ResponseCode.SUCCESS) {
//                    ReactionSummaryDto reactionSummary = (ReactionSummaryDto) reactionResponse2.getBody()
//                        .getData();

//                    byeBoardDto.setReactionTypeCounts(
//                        reactionSummary.getReactionTypeCounts()); // 추가된 부분
//                }
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

package com.web.ndolphin.service.impl;

import static java.util.stream.Collectors.toList;

import com.web.ndolphin.common.ResponseCode;
import com.web.ndolphin.common.ResponseMessage;
import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.BoardType;
import com.web.ndolphin.domain.BoardView;
import com.web.ndolphin.domain.EntityType;
import com.web.ndolphin.domain.Reaction;
import com.web.ndolphin.domain.ReactionType;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.board.request.BoardRequestDto;
import com.web.ndolphin.dto.board.response.BoardDto;
import com.web.ndolphin.dto.board.response.ByeBoardDto;
import com.web.ndolphin.dto.board.response.OkBoardDto;
import com.web.ndolphin.dto.board.response.OpinionBoardDetailResponseDto;
import com.web.ndolphin.dto.board.response.OpinionBoardResponseDto;
import com.web.ndolphin.dto.board.response.RelayBoardDetailResponseDto;
import com.web.ndolphin.dto.board.response.RelayBoardResponseDto;
import com.web.ndolphin.dto.board.response.VoteBoardDetailResponseDto;
import com.web.ndolphin.dto.board.response.VoteBoardResponseDto;
import com.web.ndolphin.dto.comment.CommentResponseDto;
import com.web.ndolphin.dto.file.response.FileInfoResponseDto;
import com.web.ndolphin.dto.vote.VoteInfo;
import com.web.ndolphin.dto.voteContent.UserVoteContent;
import com.web.ndolphin.mapper.BoardMapper;
import com.web.ndolphin.mapper.BoardViewMapper;
import com.web.ndolphin.mapper.VoteContentMapper;
import com.web.ndolphin.repository.BoardRepository;
import com.web.ndolphin.repository.BoardViewRepository;
import com.web.ndolphin.repository.CommentRepository;
import com.web.ndolphin.repository.FavoriteRepository;
import com.web.ndolphin.repository.ReactionRepository;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.repository.VoteContentRepository;
import com.web.ndolphin.repository.VoteRepository;
import com.web.ndolphin.service.interfaces.BoardService;
import com.web.ndolphin.service.interfaces.CommentService;
import com.web.ndolphin.service.interfaces.FileInfoService;
import com.web.ndolphin.service.interfaces.OpenAIService;
import com.web.ndolphin.service.interfaces.TokenService;
import com.web.ndolphin.service.interfaces.VoteService;
import jakarta.transaction.Transactional;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
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
    private final BoardViewRepository boardViewRepository;
    private final CommentRepository commentRepository;
    private final FavoriteRepository favoriteRepository;
    private final ReactionRepository reactionRepository;
    private final VoteRepository voteRepository;
    private final VoteContentRepository voteContentRepository;

    private final FileInfoService fileInfoService;
    private final TokenService tokenService;
    private final VoteService voteService;
    private final CommentService commentService;
    private final OpenAIService openAIService;

    @Override
    @Transactional
    public ResponseEntity<ResponseDto> createBoard(BoardRequestDto boardRequestDto,
        List<MultipartFile> multipartFiles) {

        try {
            Long userId = tokenService.getUserIdFromToken();

            User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));

            Board board = BoardMapper.toEntity(boardRequestDto, user);

            // 게시글 처리
            boardRepository.save(board);

            if (boardRequestDto.getBoardType() == BoardType.RELAY_BOARD) {
                // AI 요약 처리
                String summary = openAIService.summarizeText(board.getContent());
                board.setSummary(summary);
                boardRepository.save(board);
            }

            // 파일 업로드 처리
            fileInfoService.uploadFiles(board.getId(), EntityType.POST, multipartFiles);

            // Dall-E 처리
            if (boardRequestDto.getDalleUrl() != null) {
                setDalle(boardRequestDto, board);
            }

            // 투표 처리
            if (boardRequestDto.getBoardType() == BoardType.VOTE_BOARD) {
                setVoteContents(boardRequestDto, board);
            }

            return getBoardById(board.getId());
        } catch (Exception e) {
            return ResponseDto.databaseError(e.getMessage());
        }
    }

    private void setDalle(BoardRequestDto boardRequestDto, Board board) {

        fileInfoService.uploadDallEFile(board.getId(), EntityType.POST,
            boardRequestDto.getDalleUrl());
    }

    private void setVoteContents(BoardRequestDto boardRequestDto, Board board) {

        boardRequestDto.getVoteContents().stream()
            .map(content -> VoteContentMapper.toEntity(board, content))
            .forEach(voteContentRepository::save);
    }

    @Override
    public ResponseEntity<ResponseDto<Page<BoardDto>>> getBoardsByType(BoardType boardType,
        String filter1, String filter2, String search, Pageable pageable, Boolean isDone) {

        // 전체 데이터를 페이징 없이 먼저 가져옵니다.
        List<Board> allBoards = boardRepository.findByTypeAndFiltersWithoutPaging(boardType,
            filter1, filter2, search, isDone);

        // 필터링 로직 적용 (RelayBoard의 경우 isDone 필터 추가)
        List<Board> filteredBoards = allBoards.stream()
            .filter(board -> {
                Long commentCount = commentRepository.countCommentsByBoardId(board.getId());
                boolean isDoneFlag = (commentCount + 1) == board.getMaxPage();
                return isDone == null || isDoneFlag == isDone;
            })
            .collect(Collectors.toList());

        // 페이징 처리
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), filteredBoards.size());

        // start가 리스트의 크기보다 크거나 같으면 빈 리스트를 반환
        if (start >= filteredBoards.size()) {
            Page<BoardDto> emptyPage = new PageImpl<>(new ArrayList<>(), pageable,
                filteredBoards.size());
            ResponseDto<Page<BoardDto>> responseBody = new ResponseDto<>(ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS, emptyPage);
            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        }

        List<Board> pagedBoards = filteredBoards.subList(start, end);

        // getBoardDtos 메서드 호출
        List<? extends BoardDto> boardDtos = getBoardDtos(boardType, pagedBoards, isDone);

        // List<? extends BoardDto>를 List<BoardDto>로 캐스팅
        List<BoardDto> castedBoardDtos = boardDtos.stream()
            .map(boardDto -> (BoardDto) boardDto)
            .collect(Collectors.toList());

        // Page<BoardDto>로 변환
        Page<BoardDto> boardDtosPage = new PageImpl<>(castedBoardDtos, pageable,
            filteredBoards.size());

        ResponseDto<Page<BoardDto>> responseBody = new ResponseDto<>(ResponseCode.SUCCESS,
            ResponseMessage.SUCCESS, boardDtosPage);

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    private List<? extends BoardDto> getBoardDtos(BoardType boardType, List<Board> boards,
        Boolean isDone) {
        return switch (boardType) {
            case VOTE_BOARD -> getVoteBoardResponseDtos(boards);
            case OPINION_BOARD -> getOpinionBoardResponseDtos(boards);
            case RELAY_BOARD -> getRelayBoardResponseDtos(boards, isDone);
            case OK_BOARD -> getOkBoardResponseDtos(boards);
            case BYE_BOARD, ANNOUNCEMENT_BOARD -> getByeBoardResponseDtos(boards);
            default -> throw new IllegalArgumentException("Unsupported board type");
        };
    }

    private List<VoteBoardResponseDto> getVoteBoardResponseDtos(List<Board> boards) {

        return boards.stream()
            .map(board -> {
                Long boardId = board.getId();
                List<VoteInfo> voteInfos = voteService.getVoteContents(boardId);

                Long totalVoteCnt = voteInfos.stream()
                    .mapToLong(VoteInfo::getVoteCount)
                    .sum();

                List<String> voteContents = voteInfos.stream()
                    .map(VoteInfo::getVoteContent)
                    .collect(toList());

                String fileUrl = getFileUrl(boardId, EntityType.POST);
                String fileName = getFileName(boardId, EntityType.POST);

                return BoardMapper.toVoteBoardResponseDto(board, voteContents, totalVoteCnt,
                    fileUrl, fileName);
            })
            .collect(toList());
    }

    private List<OpinionBoardResponseDto> getOpinionBoardResponseDtos(List<Board> boards) {

        return boards.stream()
            .map(board -> {
                Long boardId = board.getId();

                Pageable pageable = PageRequest.of(0, 1);
                List<String> bestComments = commentRepository.findTopCommentContentByLikes(boardId,
                    pageable);

                String bestComment = bestComments.isEmpty() ? null : bestComments.get(0);
                Long commentCount = commentRepository.countCommentsByBoardId(boardId);

                String fileUrl = getFileUrl(boardId, EntityType.POST);
                String fileName = getFileName(boardId, EntityType.POST);

                return BoardMapper.toOpinionBoardResponseDto(board, bestComment, commentCount,
                    fileUrl, fileName);
            })
            .collect(toList());
    }

    private List<RelayBoardResponseDto> getRelayBoardResponseDtos(List<Board> boards,
        Boolean isDone) {

        log.info("Filtering with isDone: {}", isDone);  // 로그 출력

        Long userId = tokenService.getUserIdFromToken();

        return boards.stream()
            .filter(board -> {
                Long commentCount = commentRepository.countCommentsByBoardId(board.getId());
                boolean isDoneFlag = (commentCount + 1) == board.getMaxPage();
                return isDone == null || isDoneFlag == isDone;
            })
            .map(board -> {
                Long writerId = board.getUser().getUserId();
                Long boardId = board.getId();

                boolean hasParticipated = hasUserParticipated(boardId, userId);
                if (writerId == userId) {
                    hasParticipated = true;
                }

                boolean isFavorite = favoriteRepository.existsByBoardIdAndUserId(boardId, userId);
                String fileUrl = getFileUrl(boardId, EntityType.POST);
                String fileName = getFileName(boardId, EntityType.POST);
                Long commentCount = commentRepository.countCommentsByBoardId(boardId);
                boolean isDoneFlag = (commentCount + 1) == board.getMaxPage();

                return BoardMapper.toRelayBoardResponseDto(board, hasParticipated, isFavorite,
                    fileUrl, fileName, commentCount, isDoneFlag);
            })
            .collect(Collectors.toList());
    }

    private List<OkBoardDto> getOkBoardResponseDtos(List<Board> boards) {

        return boards.stream()
            .map(board -> {
                List<FileInfoResponseDto> fileInfoResponseDtos = getFileInfoDtos(board.getId(),
                    EntityType.POST);

                List<String> fileNames = fileInfoResponseDtos.stream()
                    .map(FileInfoResponseDto::getFileName)
                    .collect(toList());

                List<String> fileUrls = fileInfoResponseDtos.stream()
                    .map(FileInfoResponseDto::getFileUrl)
                    .collect(toList());

                OkBoardDto okBoardDto = BoardMapper.toOkBoardDto(board, fileNames, fileUrls);
                List<CommentResponseDto> comments = commentService.getBoardDetail(board.getId());

                okBoardDto.setCommentResponseDtos(comments);
                okBoardDto.setCommentCnt((long) comments.size());

                return okBoardDto;
            })
            .collect(toList());
    }

    private List<ByeBoardDto> getByeBoardResponseDtos(List<Board> boards) {

        return boards.stream()
            .map(board -> {
                Map<ReactionType, Long> reactionTypeCounts = getReactionTypeCounts(board.getId());
                Reaction userReaction = reactionRepository.findByBoardIdAndUserId(board.getId(),
                    board.getUser().getUserId());

                return BoardMapper.toByeBoardDto(board, reactionTypeCounts, userReaction);
            })
            .collect(toList());
    }

    @Override
    public ResponseEntity<ResponseDto> getBoardById(Long boardId) {

        Long userId = tokenService.getUserIdFromToken();
        Board board = boardRepository.findById(boardId)
            .orElseThrow(() -> new IllegalArgumentException("Invalid Board ID"));

        board.setHit(board.getHit() + 1);
        boardRepository.save(board);

        BoardDto boardDto = getBoardDetail(board, userId);

        ResponseDto<?> responseBody = new ResponseDto<>(ResponseCode.SUCCESS,
            ResponseMessage.SUCCESS, boardDto);

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    private BoardDto getBoardDetail(Board board, Long userId) {

        String fileUrl = getFileUrl(board.getId(), EntityType.POST);
        String fileName = getFileName(board.getId(), EntityType.POST);

        User user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));

        try {
            BoardView boardView = BoardViewMapper.toEntity(user, board);
            boardViewRepository.save(boardView);
        } catch (DataIntegrityViolationException e) {
            // 이미 존재하는 경우 - 아무 처리도 하지 않음
        }

        return switch (board.getBoardType()) {
            case VOTE_BOARD -> getVoteBoardDetail(board, userId, fileUrl, fileName);
            case OPINION_BOARD -> getOpinionBoardDetail(board, userId, fileUrl, fileName);
            case RELAY_BOARD -> getRelayBoardDetail(board, userId, fileUrl, fileName);
            case OK_BOARD, ANNOUNCEMENT_BOARD -> getOkBoardDetail(board);
            default -> throw new IllegalArgumentException("Unsupported board type");
        };
    }

    private VoteBoardDetailResponseDto getVoteBoardDetail(Board board, Long userId,
        String fileUrl, String fileName) {

        List<VoteInfo> voteInfos = voteService.getVoteContents(board.getId());

        long totalVotes = voteInfos.stream()
            .mapToLong(VoteInfo::getVoteCount)
            .sum();

        UserVoteContent userVoteContent = voteRepository.findVoteByBoardIdAndUserId(
            board.getId(), userId).orElse(null);

        // side에 띄울 보드 3개를 가져 옴.
        List<Board> sideBoards = boardRepository.findTop3NotViewedByUserAndBoardType(
            userId, BoardType.VOTE_BOARD, PageRequest.of(0, 3));

        // 3개 미만 이라면 최신순으로 3개 가져옴.
        if (sideBoards.size() < 3) {
            sideBoards = boardRepository.findByBoardType(BoardType.VOTE_BOARD,
                PageRequest.of(0, 3));
        }

        // BoardDto로 반환해서 가져 옴.
        List<? extends BoardDto> sideBoardDtos = getBoardDtos(BoardType.VOTE_BOARD, sideBoards,
            false);

        return BoardMapper.toVoteBoardDetailResponseDto(board, fileUrl, fileName, voteInfos,
            totalVotes, userVoteContent, sideBoardDtos);
    }

    private OpinionBoardDetailResponseDto getOpinionBoardDetail(Board board, Long userId,
        String fileUrl, String fileName) {

        // 참여 했으면 다시 참여 못하게 해야함.
        boolean hasParticipated = hasUserParticipated(board.getId(), userId);
        if (board.getUser().getUserId() == userId) {
            hasParticipated = true;
        }

        List<CommentResponseDto> commentResponseDtos = commentService.getBoardDetail(board.getId());
        int commentCount = commentResponseDtos.size();

        // side에 띄울 보드 3개를 가져 옴.
        List<Board> sideBoards = boardRepository.findTop3NotViewedByUserAndBoardType(userId,
            BoardType.OPINION_BOARD, PageRequest.of(0, 3));

        // 3개 미만 이라면 최신순으로 3개 가져옴.
        if (sideBoards.size() < 3) {
            sideBoards = boardRepository.findByBoardType(BoardType.OPINION_BOARD,
                PageRequest.of(0, 3));
        }

        // BoardDto로 반환해서 가져 옴.
        List<? extends BoardDto> sideBoardDtos = getBoardDtos(BoardType.OPINION_BOARD, sideBoards,
            false);

        return BoardMapper.toOpinionBoardDetailResponseDto(board, fileUrl, fileName,
            hasParticipated, commentCount, commentResponseDtos, sideBoardDtos);
    }

    private RelayBoardDetailResponseDto getRelayBoardDetail(Board board, Long userId,
        String fileUrl, String fileName) {

        boolean hasParticipated = hasUserParticipated(board.getId(), userId);
        if (board.getUser().getUserId() == userId) {
            hasParticipated = true;
        }

        List<CommentResponseDto> comments = commentService.getBoardDetail(board.getId());
        Map<ReactionType, Long> reactionTypeCounts = getReactionTypeCounts(board.getId());
        Reaction reaction = reactionRepository.findByBoardIdAndUserId(board.getId(), userId);

        return BoardMapper.toRelayBoardDetailResponseDto(board, hasParticipated, fileUrl, fileName,
            comments, reactionTypeCounts, reaction);
    }

    private OkBoardDto getOkBoardDetail(Board board) {

        // 파일 정보를 가져오기
        List<FileInfoResponseDto> fileInfoResponseDtos = getFileInfoDtos(board.getId(),
            EntityType.POST);

        // 파일명과 파일 URL 리스트 생성
        List<String> fileNames = fileInfoResponseDtos.stream()
            .map(FileInfoResponseDto::getFileName)
            .collect(toList());

        List<String> fileUrls = fileInfoResponseDtos.stream()
            .map(FileInfoResponseDto::getFileUrl)
            .collect(toList());

        List<CommentResponseDto> comments = commentService.getBoardDetail(board.getId());

        OkBoardDto okBoardDto = BoardMapper.toOkBoardDto(board, fileNames, fileUrls);
        okBoardDto.setCommentResponseDtos(comments);
        okBoardDto.setCommentCnt((long) comments.size());

        return okBoardDto;
    }

    @Override
    public ResponseEntity<ResponseDto> updateBoard(Long boardId, BoardRequestDto boardRequestDto,
        List<MultipartFile> multipartFiles, List<String> fileNamesToDelete) throws IOException {

        // 게시글 처리
        Board board = boardRepository.findById(boardId)
            .orElseThrow(() -> new IllegalArgumentException("Invalid Board ID"));

        board.setSubject(boardRequestDto.getSubject());
        board.setContent(boardRequestDto.getContent());
        board.setMaxPage(boardRequestDto.getMaxPage());
        board.setUpdatedAt(LocalDateTime.now());

        if (boardRequestDto.getBoardType() == BoardType.VOTE_BOARD) {
            board.getVoteContents().clear();
            setVoteContents(boardRequestDto, board);
        }

        boardRepository.save(board);

        fileInfoService.deleteFiles(boardId, EntityType.POST, fileNamesToDelete);
        fileInfoService.uploadFiles(boardId, EntityType.POST, multipartFiles);

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
    public List<RelayBoardDetailResponseDto> getRelayBoards(String period) {

        List<RelayBoardDetailResponseDto> relayBoardDetailResponseDtos = new ArrayList<>();
        List<Board> boards = boardRepository.findRelayBoardsByPeriod(period);

        for (Board board : boards) {
            // 댓글 수 계산
            Long commentCount = commentRepository.countCommentsByBoardId(board.getId());

            // 완료된 이야기인지 판단
            boolean isDone = commentCount != null && commentCount == (board.getMaxPage() - 1);

            // 완료된 이야기만 처리
            if (isDone) {
                String fileUrl = getFileUrl(board.getId(), EntityType.POST);
                String fileName = getFileName(board.getId(), EntityType.POST);

                Map<ReactionType, Long> reactionTypeCounts = getReactionTypeCounts(board.getId());
                Long reactionCount = reactionTypeCounts.values()
                    .stream()
                    .mapToLong(Long::longValue)
                    .sum();

                RelayBoardDetailResponseDto relayBoardDetailResponseDto = BoardMapper.toRelayBoardDetailResponseDto(
                    board, false, fileUrl, fileName, null, reactionTypeCounts,
                    null);
                relayBoardDetailResponseDto.setReactionCount(reactionCount);
                relayBoardDetailResponseDtos.add(relayBoardDetailResponseDto);
            }
        }

        return relayBoardDetailResponseDtos;
    }

    @Override
    public List<VoteBoardDetailResponseDto> getVoteBoards(String period) {

        List<VoteBoardDetailResponseDto> voteBoardDetailResponseDtos = new ArrayList<>();
        List<Board> boards = boardRepository.findVoteBoardsByPeriod(period);

        for (Board board : boards) {
            String fileUrl = getFileUrl(board.getId(), EntityType.POST);
            String fileName = getFileName(board.getId(), EntityType.POST);

            List<VoteInfo> voteInfos = voteService.getVoteContents(board.getId());

            long totalVotes = voteInfos.stream()
                .mapToLong(VoteInfo::getVoteCount)
                .sum();

            VoteBoardDetailResponseDto voteBoardDetailResponseDto = BoardMapper.toVoteBoardDetailResponseDto(
                board, fileUrl, fileName, null, totalVotes, null, null);

            voteBoardDetailResponseDtos.add(voteBoardDetailResponseDto);
        }

        return voteBoardDetailResponseDtos;
    }

    @Override
    public List<OpinionBoardDetailResponseDto> getOpinionBoards(String period) {

        List<OpinionBoardDetailResponseDto> OpinionBoardDetailResponseDtos = new ArrayList<>();
        List<Board> boards = boardRepository.findOpinionBoardsByPeriod(period);

        for (Board board : boards) {
            String fileUrl = getFileUrl(board.getId(), EntityType.POST);
            String fileName = getFileName(board.getId(), EntityType.POST);
            int commentCount = board.getComments().size();

            OpinionBoardDetailResponseDto opinionBoardDetailResponseDto = BoardMapper.toOpinionBoardDetailResponseDto(
                board, fileUrl, fileName, false, commentCount, null, null);

            OpinionBoardDetailResponseDtos.add(opinionBoardDetailResponseDto);
        }

        return OpinionBoardDetailResponseDtos;
    }

    private String getFileUrl(Long entityId, EntityType entityType) {
        return fileInfoService.getFileUrl(entityId, entityType);
    }

    private String getFileName(Long entityId, EntityType entityType) {
        return fileInfoService.getFileName(entityId, entityType);
    }

    private List<FileInfoResponseDto> getFileInfoDtos(Long entityId, EntityType entityType) {
        return fileInfoService.getFileInfos(entityId, entityType);
    }

    private boolean hasUserParticipated(Long boardId, Long userId) {
        return commentRepository.existsByBoardIdAndUserId(boardId, userId);
    }
}

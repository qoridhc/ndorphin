package com.web.ndolphin.service.impl;

import static java.util.stream.Collectors.toList;

import com.web.ndolphin.common.ResponseCode;
import com.web.ndolphin.common.ResponseMessage;
import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.BoardType;
import com.web.ndolphin.domain.Comment;
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
import com.web.ndolphin.mapper.CommentMapper;
import com.web.ndolphin.mapper.VoteContentMapper;
import com.web.ndolphin.repository.BoardRepository;
import com.web.ndolphin.repository.CommentRepository;
import com.web.ndolphin.repository.FavoriteRepository;
import com.web.ndolphin.repository.ReactionRepository;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.repository.VoteContentRepository;
import com.web.ndolphin.repository.VoteRepository;
import com.web.ndolphin.service.interfaces.BoardService;
import com.web.ndolphin.service.interfaces.CommentService;
import com.web.ndolphin.service.interfaces.FileInfoService;
import com.web.ndolphin.service.interfaces.TokenService;
import com.web.ndolphin.service.interfaces.VoteService;
import jakarta.transaction.Transactional;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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
    private final ReactionRepository reactionRepository;
    private final VoteRepository voteRepository;
    private final VoteContentRepository voteContentRepository;

    private final FileInfoService fileInfoService;
    private final TokenService tokenService;
    private final VoteService voteService;
    private final CommentService commentService;

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
    public ResponseEntity<ResponseDto> getBoardsByType(BoardType boardType, String filter1,
        String filter2, String search) {

        List<Board> boards = boardRepository.findByTypeAndFilters(boardType, filter1, filter2,
            search);
        List<? extends BoardDto> boardDtos = getBoardDtos(boardType, boards);

        ResponseDto<?> responseBody = new ResponseDto<>(ResponseCode.SUCCESS,
            ResponseMessage.SUCCESS,
            boardDtos);

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    private List<? extends BoardDto> getBoardDtos(BoardType boardType, List<Board> boards) {

        return switch (boardType) {
            case VOTE_BOARD -> getVoteBoardResponseDtos(boards);
            case OPINION_BOARD -> getOpinionBoardResponseDtos(boards);
            case RELAY_BOARD -> getRelayBoardResponseDtos(boards);
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

                long totalVotes = voteInfos.stream()
                    .mapToLong(VoteInfo::getVoteCount)
                    .sum();

                List<String> voteContents = voteInfos.stream()
                    .map(VoteInfo::getVoteContent)
                    .collect(toList());

                return BoardMapper.toVoteBoardResponseDto(board, voteContents, totalVotes);
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

                return BoardMapper.toOpinionBoardResponseDto(board, bestComment, commentCount);
            })
            .collect(toList());
    }

    private List<RelayBoardResponseDto> getRelayBoardResponseDtos(List<Board> boards) {

        return boards.stream()
            .map(board -> {
                Long boardId = board.getId();
                boolean hasParticipated = hasUserParticipated(boardId, board.getUser().getUserId());
                boolean isFavorite = favoriteRepository.existsByBoardIdAndUserId(boardId,
                    board.getUser().getUserId());
                String thumbNailUrl = fileInfoService.getFileUrl(boardId, EntityType.POST);
                Long commentCount = commentRepository.countCommentsByBoardId(boardId);
                boolean isDone = (commentCount + 1) == board.getMaxPage();

                return BoardMapper.toRelayBoardResponseDto(board, hasParticipated, isFavorite,
                    thumbNailUrl, commentCount, isDone);
            })
            .collect(toList());
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

        String contentFileUrl = getFileUrl(board.getId(), EntityType.POST);

        return switch (board.getBoardType()) {
            case VOTE_BOARD -> getVoteBoardDetail(board, userId, contentFileUrl);
            case OPINION_BOARD -> getOpinionBoardDetail(board, userId, contentFileUrl);
            case RELAY_BOARD -> getRelayBoardDetail(board, userId, contentFileUrl);
            case OK_BOARD, ANNOUNCEMENT_BOARD -> getOkBoardDetail(board);
            default -> throw new IllegalArgumentException("Unsupported board type");
        };
    }

    private VoteBoardDetailResponseDto getVoteBoardDetail(Board board, Long userId,
        String contentFileUrl) {

        List<VoteInfo> voteInfos = voteService.getVoteContents(board.getId());

        UserVoteContent userVoteContent = voteRepository.findVoteByBoardIdAndUserId(
            board.getId(), userId).orElse(null);

        return BoardMapper.toVoteBoardDetailResponseDto(board, contentFileUrl, voteInfos,
            userVoteContent);
    }

    private OpinionBoardDetailResponseDto getOpinionBoardDetail(Board board, Long userId,
        String contentFileUrl) {

        // 참여 했으면 다시 참여 못하게 해야함.
        boolean hasParticipated = hasUserParticipated(board.getId(), userId);
        List<CommentResponseDto> commentResponseDtos = commentService.getBoardDetail(board.getId());
        int commentCount = commentResponseDtos.size();

        return BoardMapper.toOpinionBoardDetailResponseDto(
            board, contentFileUrl, hasParticipated, commentCount, commentResponseDtos);
    }

    private RelayBoardDetailResponseDto getRelayBoardDetail(Board board, Long userId,
        String contentFileUrl) {

        boolean hasParticipated = hasUserParticipated(board.getId(), userId);
        List<CommentResponseDto> comments = commentService.getBoardDetail(board.getId());
        Map<ReactionType, Long> reactionTypeCounts = getReactionTypeCounts(board.getId());
        Reaction reaction = reactionRepository.findByBoardIdAndUserId(board.getId(), userId);

        return BoardMapper.toRelayBoardDetailResponseDto(board, hasParticipated, contentFileUrl,
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
        List<MultipartFile> multipartFiles, List<String> fileNamesToDelete) {

        // 게시글 처리
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        if (optionalBoard.isEmpty()) {
            return ResponseDto.databaseError();
        }

        Board existingBoard = optionalBoard.get();
        existingBoard.setSubject(boardRequestDto.getSubject());
        existingBoard.setContent(boardRequestDto.getContent());
//        existingBoard.setHit(existingBoard.getHit() + 1);
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

        String contentFileUrl;
        List<Comment> comments;
        List<CommentResponseDto> commentResponseDtos;
        Long userId = tokenService.getUserIdFromToken();
        boolean hasParticipated;

        for (Board board : boards) {
            contentFileUrl = fileInfoService.getFileUrl(board.getId(), EntityType.POST);

            hasParticipated = commentRepository.existsByBoardIdAndUserId(board.getId(), userId);

            comments = commentRepository.findByBoardId(board.getId());

            commentResponseDtos = comments
                .stream()
                .map(comment -> {
                    String commentContentFileUrl = fileInfoService.getFileUrl(comment.getId(),
                        EntityType.COMMENT);

                    CommentResponseDto commentResponseDto = CommentMapper.toDto(comment, 0L,
                        false, null, commentContentFileUrl);

                    return commentResponseDto;
                }).collect(toList());

            Map<ReactionType, Long> reactionTypeCounts = getReactionTypeCounts(board.getId());

            Reaction reaction = reactionRepository.findByBoardIdAndUserId(board.getId(), userId);

            RelayBoardDetailResponseDto relayBoardDetailResponseDto = BoardMapper.toRelayBoardDetailResponseDto(
                board, hasParticipated, contentFileUrl, commentResponseDtos, reactionTypeCounts,
                reaction);

            relayBoardDetailResponseDtos.add(relayBoardDetailResponseDto);
        }

        return relayBoardDetailResponseDtos;
    }

    @Override
    public List<VoteBoardDetailResponseDto> getVoteBoards(String period) {

        List<VoteBoardDetailResponseDto> voteBoardDetailResponseDtos = new ArrayList<>();
        List<Board> boards = boardRepository.findVoteBoardsByPeriod(period);

        String contentFileUrl;
        String avatarUrl;
        Long userId = tokenService.getUserIdFromToken();

        for (Board board : boards) {
            contentFileUrl = fileInfoService.getFileUrl(board.getId(), EntityType.POST);

            avatarUrl = fileInfoService.getFileUrl(userId, EntityType.USER);

            List<VoteInfo> voteInfos = voteService.getVoteContents(board.getId());

            UserVoteContent userVoteContent = voteRepository.findVoteByBoardIdAndUserId(
                    board.getId(), userId)
                .orElse(null);

            VoteBoardDetailResponseDto voteBoardDetailResponseDto = BoardMapper.toVoteBoardDetailResponseDto(
                board, contentFileUrl, voteInfos, userVoteContent);

            voteBoardDetailResponseDtos.add(voteBoardDetailResponseDto);
        }

        return voteBoardDetailResponseDtos;
    }

    @Override
    public List<OpinionBoardDetailResponseDto> getOpinionBoards(String period) {

        List<OpinionBoardDetailResponseDto> OpinionBoardDetailResponseDtos = new ArrayList<>();
        List<Board> boards = boardRepository.findOpinionBoardsByPeriod(period);

        String contentFileUrl;
        String avatarUrl;
        List<Comment> comments;
        List<CommentResponseDto> commentResponseDtos;
        Long userId = tokenService.getUserIdFromToken();
        boolean hasParticipated;
        int commentCount;

        for (Board board : boards) {
            contentFileUrl = fileInfoService.getFileUrl(board.getId(), EntityType.POST);

            avatarUrl = fileInfoService.getFileUrl(userId, EntityType.USER);

            hasParticipated = commentRepository.existsByBoardIdAndUserId(board.getId(), userId);

            comments = commentRepository.findByBoardId(board.getId());

            commentResponseDtos = comments
                .stream()
                .map(comment -> {
                    Long likeCnt = commentRepository.countLovesByCommentId(comment.getId());

                    boolean isLiked = commentRepository.existsByBoardIdAndUserId(board.getId(),
                        userId);

                    CommentResponseDto commentResponseDto = CommentMapper.toDto(comment,
                        likeCnt, isLiked, null, null);

                    return commentResponseDto;
                }).collect(toList());

            commentCount = commentResponseDtos.size();

            OpinionBoardDetailResponseDto opinionBoardDetailResponseDto = BoardMapper.toOpinionBoardDetailResponseDto(
                board, contentFileUrl, hasParticipated, commentCount,
                commentResponseDtos);

            OpinionBoardDetailResponseDtos.add(opinionBoardDetailResponseDto);
        }

        return OpinionBoardDetailResponseDtos;
    }

    private String getFileUrl(Long entityId, EntityType entityType) {
        return fileInfoService.getFileUrl(entityId, entityType);
    }

    private List<FileInfoResponseDto> getFileInfoDtos(Long entityId, EntityType entityType) {
        return fileInfoService.getFileInfos(entityId, entityType);
    }

    private boolean hasUserParticipated(Long boardId, Long userId) {
        return commentRepository.existsByBoardIdAndUserId(boardId, userId);
    }
}

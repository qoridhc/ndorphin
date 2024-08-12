package com.web.ndolphin.mapper;

import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.Reaction;
import com.web.ndolphin.domain.ReactionType;
import com.web.ndolphin.domain.User;
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
import com.web.ndolphin.dto.vote.VoteInfo;
import com.web.ndolphin.dto.voteContent.UserVoteContent;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class BoardMapper {

    // 공통된 Entity -> DTO 변환 로직
    private static void mapCommonFields(Board board, BoardDto dto) {

        dto.setUser(UserMapper.toDto(board.getUser()));
        dto.setId(board.getId());
        dto.setSubject(board.getSubject());
        dto.setContent(board.getContent());
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
    public static ByeBoardDto toByeBoardDto(Board board, Map<ReactionType, Long> reactionTypeCounts,
        Reaction userReaction) {

        ByeBoardDto dto = new ByeBoardDto();

        mapCommonFields(board, dto);

        dto.setReactionTypeCounts(reactionTypeCounts);
        if (userReaction != null) {
            dto.setUserReactionId(userReaction.getId());
            dto.setUserReactionType(userReaction.getReactionType());
        } else {
            dto.setUserReactionType(ReactionType.NONE);
        }

        return dto;
    }

    // Entity -> OkBoardDto 변환
    public static OkBoardDto toOkBoardDto(Board board, List<String> fileNames,
        List<String> fileUrls) {

        OkBoardDto dto = new OkBoardDto();
        mapCommonFields(board, dto);
        dto.setFileNames(fileNames);
        dto.setFileUrls(fileUrls);

        return dto;
    }

    public static VoteBoardResponseDto toVoteBoardResponseDto(Board board,
        List<String> voteContents, long totalVoteCnt, String fileUrl, String fileName) {

        VoteBoardResponseDto voteBoardResponseDto = new VoteBoardResponseDto();

        mapCommonFields(board, voteBoardResponseDto);
        voteBoardResponseDto.setVoteContents(voteContents);
        voteBoardResponseDto.setTotalVoteCnt(totalVoteCnt);
        voteBoardResponseDto.getFileUrls().add(fileUrl);
        voteBoardResponseDto.getFileNames().add(fileName);

        return voteBoardResponseDto;
    }

    public static VoteBoardDetailResponseDto toVoteBoardDetailResponseDto(Board board,
        String fileUrl, String fileName, List<VoteInfo> voteInfos, long totalVotes,
        UserVoteContent userVoteContent, List<? extends BoardDto> sideBoardDtos) {

        VoteBoardDetailResponseDto voteBoardDetailResponseDto = new VoteBoardDetailResponseDto();

        mapCommonFields(board, voteBoardDetailResponseDto);
        voteBoardDetailResponseDto.setTotalVotes(totalVotes);
        voteBoardDetailResponseDto.setVoteInfos(voteInfos);
        voteBoardDetailResponseDto.setSideBoardDtos(sideBoardDtos);
        voteBoardDetailResponseDto.getFileUrls().add(fileUrl);
        voteBoardDetailResponseDto.getFileNames().add(fileName);

        if (userVoteContent != null) {
            voteBoardDetailResponseDto.setUserVoteId(userVoteContent.getVoteId());
            voteBoardDetailResponseDto.setUserVoteContentId(userVoteContent.getVoteContentId());
        }

        return voteBoardDetailResponseDto;
    }

    public static OpinionBoardResponseDto toOpinionBoardResponseDto(Board board,
        String bestComment, Long commentCount, String fileUrl, String fileName) {

        OpinionBoardResponseDto opinionBoardResponseDto = new OpinionBoardResponseDto();

        mapCommonFields(board, opinionBoardResponseDto);
        opinionBoardResponseDto.setBestComment(bestComment);
        opinionBoardResponseDto.setCommentCount(commentCount);
        opinionBoardResponseDto.getFileUrls().add(fileUrl);
        opinionBoardResponseDto.getFileNames().add(fileName);

        return opinionBoardResponseDto;
    }

    public static OpinionBoardDetailResponseDto toOpinionBoardDetailResponseDto(Board board,
        String fileUrl, String fileName, boolean hasParticipated, int commentCount,
        List<CommentResponseDto> commentResponseDtos, List<? extends BoardDto> sideBoards) {

        OpinionBoardDetailResponseDto opinionBoardDetailResponseDto = new OpinionBoardDetailResponseDto();

        mapCommonFields(board, opinionBoardDetailResponseDto);
        opinionBoardDetailResponseDto.setHasParticipated(hasParticipated);
        opinionBoardDetailResponseDto.setCommentCount(commentCount);
        opinionBoardDetailResponseDto.setCommentResponseDtos(commentResponseDtos);
        opinionBoardDetailResponseDto.setSideBoardDtos(sideBoards);
        opinionBoardDetailResponseDto.getFileNames().add(fileName);
        opinionBoardDetailResponseDto.getFileUrls().add(fileUrl);

        log.info("opinionBoardDetailResponseDto = {}", opinionBoardDetailResponseDto);

        return opinionBoardDetailResponseDto;
    }

    public static RelayBoardResponseDto toRelayBoardResponseDto(Board board,
        boolean hasParticipated, boolean isFavorite, String fileUrl, String fileName,
        Long commentCount, boolean isDone) {

        RelayBoardResponseDto relayBoardResponseDto = new RelayBoardResponseDto();

        mapCommonFields(board, relayBoardResponseDto);
        relayBoardResponseDto.setSummary(board.getSummary());
        relayBoardResponseDto.setHasParticipated(hasParticipated);
        relayBoardResponseDto.setFavorite(isFavorite);
        relayBoardResponseDto.setMaxPage(board.getMaxPage());
        relayBoardResponseDto.setCommentCount(commentCount);
        relayBoardResponseDto.setDone(isDone);
        relayBoardResponseDto.getFileNames().add(fileName);
        relayBoardResponseDto.getFileUrls().add(fileUrl);

        return relayBoardResponseDto;
    }

    public static RelayBoardDetailResponseDto toRelayBoardDetailResponseDto(Board board,
        boolean hasParticipated, String fileUrl, String fileName,
        List<CommentResponseDto> commentResponseDtos,
        Map<ReactionType, Long> reactionTypeCounts, Reaction reaction) {

        RelayBoardDetailResponseDto relayBoardDetailResponseDto = new RelayBoardDetailResponseDto();

        mapCommonFields(board, relayBoardDetailResponseDto);
        relayBoardDetailResponseDto.setMaxPage(board.getMaxPage());
        relayBoardDetailResponseDto.setHasParticipated(hasParticipated);
        relayBoardDetailResponseDto.setCommentResponseDtos(commentResponseDtos);
        relayBoardDetailResponseDto.setReactionTypeCounts(reactionTypeCounts);
        relayBoardDetailResponseDto.getFileUrls().add(fileUrl);
        relayBoardDetailResponseDto.getFileNames().add(fileName);

        // Reaction이 null인지 확인하고 적절한 기본값 설정
        if (reaction != null) {
            relayBoardDetailResponseDto.setUserReactionId(reaction.getId());
            relayBoardDetailResponseDto.setUserReactionType(reaction.getReactionType());
        } else {
            relayBoardDetailResponseDto.setUserReactionId(null); // 또는 0L 등의 기본값
            relayBoardDetailResponseDto.setUserReactionType(ReactionType.NONE); // 기본 반응 타입
        }

        if (commentResponseDtos != null
            && board.getMaxPage() == commentResponseDtos.size() + 1) {
            relayBoardDetailResponseDto.setDone(true);
        } else {
            relayBoardDetailResponseDto.setDone(false);
        }

        return relayBoardDetailResponseDto;
    }

    // DTO -> Entity 변환
    public static Board toEntity(BoardRequestDto dto, User user) {

        Board board = new Board();

        board.setUser(user);
        board.setSubject(dto.getSubject());
        board.setContent(dto.getContent());
        board.setMaxPage(dto.getMaxPage());
        board.setBoardType(dto.getBoardType());

        return board;
    }
}

package com.web.ndolphin.mapper;

import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.Reaction;
import com.web.ndolphin.domain.ReactionType;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.board.request.BoardRequestDto;
import com.web.ndolphin.dto.board.response.BoardDto;
import com.web.ndolphin.dto.board.response.ByeBoardDto;
import com.web.ndolphin.dto.board.response.OkBoardDto;
import com.web.ndolphin.dto.board.response.OpinionBoardResponseDto;
import com.web.ndolphin.dto.board.response.RelayBoardDetailResponseDto;
import com.web.ndolphin.dto.board.response.RelayBoardResponseDto;
import com.web.ndolphin.dto.board.response.VoteBoardDetailResponseDto;
import com.web.ndolphin.dto.board.response.VoteBoardResponseDto;
import com.web.ndolphin.dto.comment.CommentResponseDto;
import com.web.ndolphin.dto.vote.VoteInfo;
import java.util.List;
import java.util.Map;

public class BoardMapper {

    // 공통된 Entity -> DTO 변환 로직
    private static void mapCommonFields(Board board, BoardDto dto) {

        dto.setId(board.getId());
        dto.setUserId(board.getUser().getUserId());
        dto.setNickName(board.getUser().getNickName());
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
        List<String> voteContents, long totalVoteCnt, String avatarUrl) {

        VoteBoardResponseDto voteBoardResponseDto = new VoteBoardResponseDto();

        mapCommonFields(board, voteBoardResponseDto);
        voteBoardResponseDto.setVoteContents(voteContents);
        voteBoardResponseDto.setTotalVoteCnt(totalVoteCnt);
        voteBoardResponseDto.setAvatarUrl(avatarUrl);

        return voteBoardResponseDto;
    }

    public static VoteBoardDetailResponseDto toVoteBoardDetailResponseDto(Board board,
        String avatarUrl, String contentFileUrl, List<VoteInfo> voteInfos, Object[] userVote) {

        VoteBoardDetailResponseDto voteBoardDetailResponseDto = new VoteBoardDetailResponseDto();

        mapCommonFields(board, voteBoardDetailResponseDto);
        voteBoardDetailResponseDto.setVoteInfos(voteInfos);
        voteBoardDetailResponseDto.setAvatarUrl(avatarUrl);
        voteBoardDetailResponseDto.setContentFileUrl(contentFileUrl);

        if (userVote.length != 0) {
            voteBoardDetailResponseDto.setUserVoteId((Long) userVote[0]);
            voteBoardDetailResponseDto.setUserVoteContentId((Long) userVote[1]);
        }

        return voteBoardDetailResponseDto;
    }

    public static OpinionBoardResponseDto toOpinionBoardResponseDto(Board board,
        String bestComment, Long commentCount, String avatarUrl) {

        OpinionBoardResponseDto opinionBoardResponseDto = new OpinionBoardResponseDto();

        mapCommonFields(board, opinionBoardResponseDto);
        opinionBoardResponseDto.setBestComment(bestComment);
        opinionBoardResponseDto.setCommentCount(commentCount);
        opinionBoardResponseDto.setAvatarUrl(avatarUrl);

        return opinionBoardResponseDto;
    }

    public static RelayBoardResponseDto toRelayBoardResponseDto(Board board,
        boolean hasParticipated, boolean isFavorite, String thumbNailUrl) {

        RelayBoardResponseDto relayBoardResponseDto = new RelayBoardResponseDto();

        mapCommonFields(board, relayBoardResponseDto);
        relayBoardResponseDto.setHasParticipated(hasParticipated);
        relayBoardResponseDto.setFavorite(isFavorite);
        relayBoardResponseDto.setThumbNailUrl(thumbNailUrl);

        return relayBoardResponseDto;
    }

    public static RelayBoardDetailResponseDto toRelayBoardDetailResponseDto(Board board,
        boolean hasParticipated, String thumbNailUrl, List<CommentResponseDto> commentResponseDtos,
        Map<ReactionType, Long> reactionTypeCounts, Reaction reaction) {

        RelayBoardDetailResponseDto relayBoardDetailResponseDto = new RelayBoardDetailResponseDto();

        mapCommonFields(board, relayBoardDetailResponseDto);
        relayBoardDetailResponseDto.setHasParticipated(hasParticipated);
        relayBoardDetailResponseDto.setThumbNailUrl(thumbNailUrl);
        relayBoardDetailResponseDto.setCommentResponseDtos(commentResponseDtos);
        relayBoardDetailResponseDto.setReactionTypeCounts(reactionTypeCounts);
        relayBoardDetailResponseDto.setUserReactionId(reaction.getId());
        relayBoardDetailResponseDto.setUserReactionType(reaction.getReactionType());

        return relayBoardDetailResponseDto;
    }

    // DTO -> Entity 변환
    public static Board toEntity(BoardRequestDto dto, User user) {

        Board board = new Board();

        board.setUser(user);
        board.setSubject(dto.getSubject());
        board.setContent(dto.getContent());
        board.setBoardType(dto.getBoardType());

        return board;
    }
}

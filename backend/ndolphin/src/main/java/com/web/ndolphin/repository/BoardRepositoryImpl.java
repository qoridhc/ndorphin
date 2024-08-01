package com.web.ndolphin.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.BoardType;
import com.web.ndolphin.domain.QBoard;
import com.web.ndolphin.service.interfaces.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class BoardRepositoryImpl implements BoardRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    private final TokenService tokenService;

    @Override
    public List<Board> findByTypeAndFilters(BoardType boardType, String filter1, String filter2, String search) {

        Long userId = tokenService.getUserIdFromToken(); // 현재 사용자의 ID를 가져옴

        QBoard board = QBoard.board;
        BooleanBuilder builder = new BooleanBuilder();

        builder.and(board.boardType.eq(boardType)); // BoardType에 따른 필터 적용

        // 필터 1 조건 처리
        if (filter1 != null && !filter1.isEmpty()) {
            switch (filter1) {
                case "subject":
                    builder.and(board.subject.containsIgnoreCase(search)); // 제목 기준 검색
                    break;
                case "content":
                    builder.and(board.content.containsIgnoreCase(search)); // 내용 기준 검색
                    break;
                case "author":
                    builder.and(board.user.nickName.containsIgnoreCase(search)); // 작성자 기준 검색
                    break;
                default:
                    builder.and(board.subject.containsIgnoreCase(search)
                        .or(board.content.containsIgnoreCase(search))
                        .or(board.user.nickName.containsIgnoreCase(search))); // 기본 검색 (제목, 내용, 작성자)
                    break;
            }
        }

        // 필터 2 조건 처리 및 정렬
        if (filter2 != null && !filter2.isEmpty()) {
            switch (filter2) {
                case "popularity":
                    if (boardType == BoardType.RELAY_BOARD) {
                        return queryFactory.selectFrom(board)
                            .where(builder)
                            .orderBy(board.reactions.size().desc()) // RELAY_BOARD는 반응 수 기준 정렬
                            .fetch();
                    } else if (boardType == BoardType.OPINION_BOARD) {
                        return queryFactory.selectFrom(board)
                            .where(builder)
                            .orderBy(board.comments.size().desc()) // OPINION_BOARD는 댓글 수 기준 정렬
                            .fetch();
                    } else if (boardType == BoardType.VOTE_BOARD) {
                        return queryFactory.selectFrom(board)
                            .where(builder)
                            .orderBy(board.voteContents.size().desc()) // VOTE_BOARD는 투표 수 기준 정렬
                            .fetch();
                    }else{
                        return queryFactory.selectFrom(board).where(builder)
                            .orderBy(board.reactions.size().desc()) // RELAY_BOARD는 반응 수 기준 정렬
                            .fetch();
                    }
                case "recent":
                    return queryFactory.selectFrom(board)
                        .where(builder)
                        .orderBy(board.createdAt.desc()) // 최신순 정렬
                        .fetch();
                case "myPosts":
                    builder.and(board.user.userId.eq(userId)); // 자신의 글 보기
                    break;
            }
        }

        // 기본 정렬 없이 조건에 맞는 게시글 리스트 반환
        return queryFactory.selectFrom(board)
            .where(builder)
            .fetch();
    }
}

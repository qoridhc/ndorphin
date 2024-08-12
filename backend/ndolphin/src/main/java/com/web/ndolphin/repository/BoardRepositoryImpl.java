package com.web.ndolphin.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.BoardType;
import com.web.ndolphin.domain.QBoard;
import com.web.ndolphin.service.interfaces.TokenService;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class BoardRepositoryImpl implements BoardRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    private final TokenService tokenService;

    @Override
    public List<Board> findByTypeAndFilters(BoardType boardType, String filter1, String filter2,
        String search) {

        Long userId = tokenService.getUserIdFromToken(); // 현재 사용자의 ID를 가져옴

        QBoard board = QBoard.board;
        BooleanBuilder builder = new BooleanBuilder();

        builder.and(board.boardType.eq(boardType)); // BoardType에 따른 필터 적용

        search = (search == null) ? "" : search;

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
            }
        } else {
            builder.and(board.subject.containsIgnoreCase(search)
                .or(board.content.containsIgnoreCase(search))
                .or(board.user.nickName.containsIgnoreCase(search))); // 기본 검색 (제목, 내용, 작성자)
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
                    } else {
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

    @Override
    public List<Board> findByTypeAndFiltersWithoutPaging(BoardType boardType, String filter1, String filter2, String search) {

        Long userId = tokenService.getUserIdFromToken(); // 현재 사용자의 ID를 가져옴

        QBoard board = QBoard.board;
        BooleanBuilder builder = new BooleanBuilder();

        builder.and(board.boardType.eq(boardType)); // BoardType에 따른 필터 적용

        search = (search == null) ? "" : search;

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
            }
        } else {
            builder.and(board.subject.containsIgnoreCase(search)
                .or(board.content.containsIgnoreCase(search))
                .or(board.user.nickName.containsIgnoreCase(search))); // 기본 검색 (제목, 내용, 작성자)
        }

        // 기본 정렬 적용 (최신순)
        JPAQuery<Board> query = queryFactory.selectFrom(board)
            .where(builder)
            .orderBy(board.createdAt.desc());

        // 필터 2 조건 처리 및 정렬
        if (filter2 != null && !filter2.isEmpty()) {
            switch (filter2) {
                case "popularity":
                    if (boardType == BoardType.RELAY_BOARD) {
                        query.orderBy(board.reactions.size().desc()); // RELAY_BOARD는 반응 수 기준 정렬
                    } else if (boardType == BoardType.OPINION_BOARD) {
                        query.orderBy(board.comments.size().desc()); // OPINION_BOARD는 댓글 수 기준 정렬
                    } else if (boardType == BoardType.VOTE_BOARD) {
                        query.orderBy(board.voteContents.size().desc()); // VOTE_BOARD는 투표 수 기준 정렬
                    }
                    break;
                case "recent":
                    query.orderBy(board.createdAt.desc()); // 최신순 정렬
                    break;
                case "myPosts":
                    builder.and(board.user.userId.eq(userId)); // 자신의 글 보기
                    break;
            }
        }

        return queryFactory.selectFrom(board)
            .where(builder)
            .fetch();
    }


    @Override
    public List<Board> findRelayBoardsByPeriod(String period) {
        LocalDateTime startDate = calculateStartDate(period);
        QBoard board = QBoard.board;

        return queryFactory.selectFrom(board)
            .where(board.boardType.eq(BoardType.RELAY_BOARD)
                .and(board.createdAt.after(startDate)))
            .orderBy(board.reactions.size().desc()) // 반응 수 기준 정렬
            .fetch();
    }

    @Override
    public List<Board> findVoteBoardsByPeriod(String period) {
        LocalDateTime startDate = calculateStartDate(period);
        QBoard board = QBoard.board;

        return queryFactory.selectFrom(board)
            .where(board.boardType.eq(BoardType.VOTE_BOARD)
                .and(board.createdAt.after(startDate)))
            .orderBy(board.voteContents.size().desc()) // 투표 수 기준 정렬
            .fetch();
    }

    @Override
    public List<Board> findOpinionBoardsByPeriod(String period) {
        LocalDateTime startDate = calculateStartDate(period);
        QBoard board = QBoard.board;

        return queryFactory.selectFrom(board)
            .where(board.boardType.eq(BoardType.OPINION_BOARD)
                .and(board.createdAt.after(startDate)))
            .orderBy(board.comments.size().desc()) // 댓글 수 기준 정렬
            .fetch();
    }

    private LocalDateTime calculateStartDate(String period) {
        switch (period.toLowerCase()) {
            case "weekly":
                return LocalDateTime.now().minusWeeks(1);
            case "monthly":
                return LocalDateTime.now().minusMonths(1);
            case "daily":
            default:
                return LocalDateTime.now().minusDays(1);
        }
    }
}

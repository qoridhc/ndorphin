package com.web.ndolphin.repository;

import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.BoardType;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long>, BoardRepositoryCustom {

    List<Board> findByBoardType(BoardType boardType);

    @Query("SELECT b, vc.content, COUNT(v) FROM Board b " +
        "LEFT JOIN b.voteContents vc " +
        "LEFT JOIN vc.votes v " +
        "WHERE b.boardType = :boardType " +
        "GROUP BY b, vc.content")
    List<Object[]> findBoardsWithVoteContentSummaries(@Param("boardType") String boardType);

    Page<Board> findByTypeAndFilters(BoardType boardType, String filter1, String filter2,
        String search, Pageable pageable);

    @Query(value = "SELECT b.* FROM boards b " +
        "LEFT JOIN board_views bv ON b.id = bv.board_id AND bv.user_id = :userId " +
        "WHERE bv.board_id IS NULL " +
        "AND b.board_type = :boardType " +
        "ORDER BY b.created_at DESC LIMIT 3",
        nativeQuery = true)
    List<Board> findTop3NotViewedByUserAndBoardType(@Param("userId") Long userId,
        @Param("boardType") BoardType boardType);
}

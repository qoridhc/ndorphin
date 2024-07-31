package com.web.ndolphin.repository;

import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.BoardType;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

    List<Board> findByBoardType(BoardType boardType);

    @Query("SELECT b, vc.content, COUNT(v) FROM Board b " +
        "LEFT JOIN b.voteContents vc " +
        "LEFT JOIN vc.votes v " +
        "WHERE b.boardType = :boardType " +
        "GROUP BY b, vc.content")
    List<Object[]> findBoardsWithVoteContentSummaries(@Param("boardType") String boardType);
}

package com.web.ndolphin.repository;

import com.web.ndolphin.domain.Vote;
import com.web.ndolphin.dto.vote.VoteCount;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {

    @Query("SELECT new com.web.ndolphin.dto.vote.VoteCount(vc.id, vc.content, COUNT(v.id)) " +
        "FROM VoteContent vc LEFT JOIN vc.votes v " +
        "WHERE vc.board.id = :boardId " +
        "GROUP BY vc.id, vc.content")
    List<VoteCount> countVotesByBoardId(@Param("boardId") Long boardId);
}

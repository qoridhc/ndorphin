package com.web.ndolphin.repository;

import com.web.ndolphin.domain.Vote;
import com.web.ndolphin.dto.vote.VoteInfo;
import com.web.ndolphin.dto.voteContent.UserVoteContent;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {

    @Query("SELECT new com.web.ndolphin.dto.vote.VoteInfo(vc.id, vc.content, COUNT(v.id)) " +
        "FROM VoteContent vc LEFT JOIN vc.votes v " +
        "WHERE vc.board.id = :boardId " +
        "GROUP BY vc.id, vc.content")
    List<VoteInfo> countVotesByBoardId(@Param("boardId") Long boardId);

    @Query(
        "SELECT new com.web.ndolphin.dto.voteContent.UserVoteContent(v.id, vc.id)  FROM Vote v " +
            "JOIN v.voteContent vc " +
            "JOIN vc.board b " +
            "WHERE b.id = :boardId AND v.user.userId = :userId")
    Optional<UserVoteContent> findVoteByBoardIdAndUserId(@Param("boardId") Long boardId,
        @Param("userId") Long userId);
}

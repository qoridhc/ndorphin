package com.web.ndolphin.repository;

import com.web.ndolphin.domain.Vote;
import com.web.ndolphin.dto.vote.response.VoteResponseDto;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {

    @Query("SELECT new com.web.ndolphin.dto.vote.response.VoteResponseDto(vc.id, COUNT(v.id)) " +
        "FROM Vote v JOIN v.voteContent vc WHERE vc.board.id = :boardId GROUP BY vc.id")
    List<VoteResponseDto> countVotesByBoardId(@Param("boardId") Long boardId);

}

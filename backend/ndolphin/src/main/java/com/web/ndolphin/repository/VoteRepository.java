package com.web.ndolphin.repository;

import com.web.ndolphin.domain.Vote;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {

    Optional<Vote> findByUser_UserIdAndVoteContent_Id(Long userId, Long voteContentId);
}

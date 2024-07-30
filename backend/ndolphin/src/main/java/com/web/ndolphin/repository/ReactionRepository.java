package com.web.ndolphin.repository;

import com.web.ndolphin.domain.Reaction;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReactionRepository extends JpaRepository<Reaction, Long> {

    List<Reaction> findByBoardId(Long boardId);
}

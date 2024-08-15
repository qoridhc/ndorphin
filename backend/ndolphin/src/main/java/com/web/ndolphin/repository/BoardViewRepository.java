package com.web.ndolphin.repository;

import com.web.ndolphin.domain.BoardView;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardViewRepository extends JpaRepository<BoardView, Long> {

    @Query("SELECT f FROM BoardView f WHERE f.user.userId = :userId AND f.board.id = :boardId")
    Optional<BoardView> findByUserIdAndBoardId(Long userId, Long boardId);
}

package com.web.ndolphin.repository;

import com.web.ndolphin.domain.Reaction;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReactionRepository extends JpaRepository<Reaction, Long> {

    // 기본 메서드
    // List<Reaction> findByBoardId(Long boardId);

    // Fetch Join을 사용한 메서드
    @Query("SELECT r FROM Reaction r JOIN FETCH r.board WHERE r.board.id = :boardId")
    List<Reaction> findByBoardId(@Param("boardId") Long boardId);

    @Query("SELECT r FROM Reaction r JOIN FETCH r.board b JOIN FETCH r.user u WHERE b.id = :boardId AND u.userId = :userId")
    Optional<Reaction> findByBoardIdAndUserId(@Param("boardId") Long boardId,
        @Param("userId") Long userId);
}

package com.web.ndolphin.repository;

import com.web.ndolphin.domain.Favorite;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    @Query("SELECT f FROM Favorite f WHERE f.user.userId = :userId AND f.board.id = :boardId")
    Optional<Favorite> findByUserIdAndBoardId(Long userId, Long boardId);

    @Query("SELECT f FROM Favorite f JOIN FETCH f.board WHERE f.user.userId = :userId")
    List<Favorite> findByUserId(Long userId);

    @Query("SELECT COUNT(f) > 0 FROM Favorite f WHERE f.board.id = :boardId AND f.user.userId = :userId")
    boolean existsByBoardIdAndUserId(@Param("boardId") Long boardId,
        @Param("userId") Long userId);
}

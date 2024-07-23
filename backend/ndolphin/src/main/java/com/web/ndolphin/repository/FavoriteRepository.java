package com.web.ndolphin.repository;

import com.web.ndolphin.domain.Favorite;
import com.web.ndolphin.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    @Query("SELECT f FROM Favorite f WHERE f.user.userId = :userId AND f.board.id = :boardId")
    Optional<Favorite> findByUserIdAndBoardId(Long userId, Long boardId);

}

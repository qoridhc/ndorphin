package com.web.ndolphin.repository;

import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.BoardType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    List<Board> findByBoardType(BoardType type);
}

package com.web.ndolphin.repository;

import com.web.ndolphin.domain.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {

}

package com.web.ndolphin.repository;

import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.BoardType;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BoardRepositoryCustom {

    List<Board> findByTypeAndFilters(BoardType boardType, String filter1, String filter2, String search);
    Page<Board> findByTypeAndFilters(BoardType boardType, String filter1, String filter2, String search, Pageable pageable);
    List<Board> findRelayBoardsByPeriod(String period);
    List<Board> findVoteBoardsByPeriod(String period);
    List<Board> findOpinionBoardsByPeriod(String period);
}
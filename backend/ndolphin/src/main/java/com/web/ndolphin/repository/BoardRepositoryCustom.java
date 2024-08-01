package com.web.ndolphin.repository;

import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.BoardType;
import java.util.List;

public interface BoardRepositoryCustom {
    List<Board> findByTypeAndFilters(BoardType boardType, String filter1, String filter2, String search);
}
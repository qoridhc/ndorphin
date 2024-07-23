package com.web.ndolphin.dto.favorite;

import com.web.ndolphin.domain.Board;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
public class FavoriteResponseDto {

    private final List<Board> boards;

}

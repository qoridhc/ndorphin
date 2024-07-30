package com.web.ndolphin.dto.favorite;

import com.web.ndolphin.dto.board.response.BoardDto;
import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class FavoriteResponseDto {

    private final List<BoardDto> BoardDtos;

}

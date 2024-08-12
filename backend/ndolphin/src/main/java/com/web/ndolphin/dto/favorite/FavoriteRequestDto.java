package com.web.ndolphin.dto.favorite;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class FavoriteRequestDto {

    private final Long boardId;
}

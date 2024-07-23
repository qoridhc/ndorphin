package com.web.ndolphin.dto.favorite;

import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class FavoriteRequestDto {

    private final Long userId;
    private final Long boardId;

}

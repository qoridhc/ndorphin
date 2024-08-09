package com.web.ndolphin.mapper;

import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.Favorite;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.board.response.RelayBoardResponseDto;
import com.web.ndolphin.dto.favorite.FavoriteResponseDto;
import java.util.List;

public class FavoriteMapper {

    public static FavoriteResponseDto toDto(List<RelayBoardResponseDto> relayBoardResponseDtos) {

        FavoriteResponseDto favoriteResponseDto = new FavoriteResponseDto(relayBoardResponseDtos);

        return favoriteResponseDto;
    }

    public static Favorite toEntity(User user, Board board) {

        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setBoard(board);

        return favorite;
    }

}

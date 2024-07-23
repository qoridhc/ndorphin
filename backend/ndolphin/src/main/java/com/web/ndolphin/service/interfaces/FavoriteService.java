package com.web.ndolphin.service.interfaces;

import com.web.ndolphin.dto.favorite.FavoriteRequestDto;

public interface FavoriteService {

    void addFavorite(FavoriteRequestDto favoriteRequestDto);

    void removeFavorite(FavoriteRequestDto favoriteRequestDto);

}



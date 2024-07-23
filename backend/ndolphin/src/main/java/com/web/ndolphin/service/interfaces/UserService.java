package com.web.ndolphin.service.interfaces;


import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.favorite.FavoriteRequestDto;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<ResponseDto> signIn(Long userId);

    void addFavorite(FavoriteRequestDto favoriteRequestDto);

    void removeFavorite(Long userId, Long boardId);
}

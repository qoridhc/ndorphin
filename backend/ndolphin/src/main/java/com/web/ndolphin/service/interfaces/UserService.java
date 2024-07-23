package com.web.ndolphin.service.interfaces;


import com.web.ndolphin.domain.Favorite;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.favorite.FavoriteRequestDto;
import com.web.ndolphin.dto.user.request.UserUpdateRequestDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    ResponseEntity<ResponseDto> signIn(Long userId);

    List<Favorite> getFavorites(Long userId);

    void addFavorite(FavoriteRequestDto favoriteRequestDto);

    void removeFavorite(Long userId, Long boardId);

    ResponseEntity<ResponseDto> deleteUser(Long userId);

    ResponseEntity<ResponseDto> updateUser(Long userId, UserUpdateRequestDto dto);
}

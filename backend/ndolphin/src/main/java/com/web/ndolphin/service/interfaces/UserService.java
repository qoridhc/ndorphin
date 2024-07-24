package com.web.ndolphin.service.interfaces;

import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.favorite.FavoriteRequestDto;
import com.web.ndolphin.dto.user.request.UserUpdateRequestDto;
import org.springframework.http.ResponseEntity;

public interface UserService {

    ResponseEntity<ResponseDto> signIn(Long userId);

    ResponseEntity<ResponseDto> getFavorites(Long userId);

    ResponseEntity<ResponseDto> addFavorite(FavoriteRequestDto favoriteRequestDto);

    ResponseEntity<ResponseDto> removeFavorite(Long userId, Long boardId);

    ResponseEntity<ResponseDto> deleteUser(Long userId);

    ResponseEntity<ResponseDto> updateUser(Long userId, UserUpdateRequestDto dto);

    ResponseEntity<ResponseDto> getUser(Long userId);
}

package com.web.ndolphin.service.interfaces;

import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.favorite.FavoriteRequestDto;
import com.web.ndolphin.dto.npoint.request.NPointDeleteRequestDto;
import com.web.ndolphin.dto.npoint.request.NPointRequestDto;
import com.web.ndolphin.dto.user.request.UserUpdateRequestDto;
import com.web.ndolphin.dto.user.response.BestNResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    void signIn(HttpServletRequest request, HttpServletResponse response, Long userId);

    ResponseEntity<ResponseDto> getFavorites(Long userId);

    ResponseEntity<ResponseDto> checkNickName(String nickName);

    ResponseEntity<ResponseDto> addFavorite(FavoriteRequestDto favoriteRequestDto);

    ResponseEntity<ResponseDto> removeFavorite(Long userId, Long boardId);

    ResponseEntity<ResponseDto> getUser(Long userId);

    ResponseEntity<ResponseDto> deleteUser(Long userId);

    ResponseEntity<ResponseDto> updateUser(Long userId, UserUpdateRequestDto dto, MultipartFile profileImage);

    ResponseEntity<ResponseDto> deleteProfile(Long userId);

    ResponseEntity<ResponseDto> addNPoint(Long userId, NPointRequestDto dto);

    ResponseEntity<ResponseDto> deleteNPoint(Long userId, NPointDeleteRequestDto dto);

    ResponseEntity<ResponseDto> getNPointPercent(Long userId);

    List<BestNResponseDto> getSortedUsersByNPoint(boolean flag);
}

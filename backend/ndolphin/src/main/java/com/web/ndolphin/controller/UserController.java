package com.web.ndolphin.controller;

import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.favorite.FavoriteRequestDto;
import com.web.ndolphin.dto.npoint.request.NPointDeleteRequestDto;
import com.web.ndolphin.dto.npoint.request.NPointRequestDto;
import com.web.ndolphin.dto.user.request.UserUpdateRequestDto;
import com.web.ndolphin.service.interfaces.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    @GetMapping("/jenkins-test")
    public ResponseEntity<ResponseDto> test() {

        return ResponseDto.success();
    }

    // ====== User CRUD ======
    @GetMapping("/{userId}")
    public ResponseEntity<ResponseDto> getUser(@PathVariable("userId") Long userId) {

        ResponseEntity<ResponseDto> response = userService.getUser(userId);

        return response;
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<ResponseDto> deleteUser(@PathVariable("userId") Long userId) {

        ResponseEntity<ResponseDto> response = userService.deleteUser(userId);

        return response;
    }

    @PutMapping("/{userId}")
    public ResponseEntity<ResponseDto> updateUser(
        @PathVariable("userId") Long userId,
        @RequestBody UserUpdateRequestDto updateDto) {

        ResponseEntity<ResponseDto> response = userService.updateUser(userId, updateDto);

        return response;
    }

    // ====== Favorite CRUD ======
    @GetMapping("/{userId}/favorites")
    public ResponseEntity<ResponseDto> getFavoritesByUserId(@PathVariable Long userId) {

        ResponseEntity<ResponseDto> response = userService.getFavorites(userId);

        return response;
    }

    @PostMapping("/{userId}/favorites")
    public ResponseEntity<ResponseDto> addFavorite(
        @RequestBody FavoriteRequestDto favoriteRequestDto) {

        ResponseEntity<ResponseDto> response = userService.addFavorite(favoriteRequestDto);

        return response;
    }

    @DeleteMapping("/{userId}/favorites/{boardId}")
    public ResponseEntity<ResponseDto> removeFavorite(
        @PathVariable Long userId,
        @PathVariable Long boardId) {

        ResponseEntity<ResponseDto> response = userService.removeFavorite(userId, boardId);

        return response;
    }

    // ====== nPoint CRUD ======
    @PostMapping("/{userId}/npoint")
    public ResponseEntity<ResponseDto> addNPoint(
        @PathVariable Long userId,
        @RequestBody NPointRequestDto nPointRequestDto
    ) {

        ResponseEntity<ResponseDto> response = userService.addNPoint(userId, nPointRequestDto);

        return response;
    }

    @DeleteMapping("/{userId}/npoint")
    public ResponseEntity<ResponseDto> deleteNPoint(
        @PathVariable Long userId,
        @RequestBody NPointDeleteRequestDto nPointDeleteRequestDto
    ) {

        ResponseEntity<ResponseDto> response = userService.deleteNPoint(userId, nPointDeleteRequestDto);

        return response;
    }

}

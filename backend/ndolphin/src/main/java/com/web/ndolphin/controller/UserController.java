package com.web.ndolphin.controller;

import com.web.ndolphin.domain.Favorite;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.favorite.FavoriteRequestDto;
import com.web.ndolphin.dto.user.request.UserUpdateRequestDto;
import com.web.ndolphin.service.interfaces.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    @GetMapping("/test")
    public String test() {
        return "test 성공";
    }

    private final UserService userService;

    @GetMapping("/{userId}/favorites")
    public ResponseEntity<List<Favorite>> getFavoritesByUserId(@PathVariable Long userId) {
        List<Favorite> favorites = userService.getFavorites(userId);
        return ResponseEntity.ok(favorites);
    }

    @PostMapping("/{userId}/favorites")
    public ResponseEntity<Void> addFavorite(@RequestBody FavoriteRequestDto favoriteRequestDto) {
        userService.addFavorite(favoriteRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{userId}/favorites/{boardId}")
    public ResponseEntity<Void> removeFavorite(@PathVariable Long userId, @PathVariable Long boardId) {
        userService.removeFavorite(userId, boardId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<ResponseDto> deleteUser(@PathVariable("userId") Long userId) {
        return userService.deleteUser(userId);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<ResponseDto> updateUser(@PathVariable("userId") Long userId, @RequestBody UserUpdateRequestDto updateDto) {
        return userService.updateUser(userId, updateDto);
    }

}

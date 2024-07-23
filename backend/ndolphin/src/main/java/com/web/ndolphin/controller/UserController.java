package com.web.ndolphin.controller;

import com.web.ndolphin.dto.favorite.FavoriteRequestDto;
import com.web.ndolphin.service.interfaces.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/{userId}/favorites")
    public ResponseEntity<Void> addFavorite(@RequestBody FavoriteRequestDto favoriteRequestDto) {
        userService.addFavorite(favoriteRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{userId}/favorites/{boardId}")
    public ResponseEntity<Void> removeFavorite(@RequestParam Long userId, @RequestParam Long boardId) {
        userService.removeFavorite(userId, boardId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}

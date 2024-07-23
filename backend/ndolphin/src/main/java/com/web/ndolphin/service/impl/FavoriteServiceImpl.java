package com.web.ndolphin.service.impl;

import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.Favorite;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.favorite.FavoriteRequestDto;
import com.web.ndolphin.repository.BoardRepository;
import com.web.ndolphin.repository.FavoriteRepository;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.service.interfaces.FavoriteService;

public class FavoriteServiceImpl implements FavoriteService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final FavoriteRepository favoriteRepository;

    public FavoriteServiceImpl(UserRepository userRepository, BoardRepository boardRepository, FavoriteRepository favoriteRepository) {
        this.userRepository = userRepository;
        this.boardRepository = boardRepository;
        this.favoriteRepository = favoriteRepository;
    }

    @Override
    public void addFavorite(FavoriteRequestDto favoriteRequestDto) {
        User user = userRepository.findById(favoriteRequestDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
        Board board = boardRepository.findById(favoriteRequestDto.getBoardId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid board ID"));

        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setBoard(board);

        favoriteRepository.save(favorite);
    }

    @Override
    public void removeFavorite(FavoriteRequestDto favoriteRequestDto) {
        Favorite favorite = favoriteRepository.findByUserIdAndBoardId(favoriteRequestDto.getUserId(), favoriteRequestDto.getBoardId())
                .orElseThrow(() -> new IllegalArgumentException("Favorite not found"));

        favoriteRepository.delete(favorite);
    }

}

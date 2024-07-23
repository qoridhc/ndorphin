package com.web.ndolphin.service.impl;

import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.Favorite;
import com.web.ndolphin.domain.Token;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.auth.response.OAuth2ResponseDto;
import com.web.ndolphin.dto.favorite.FavoriteRequestDto;
import com.web.ndolphin.provider.JwtProvider;
import com.web.ndolphin.repository.BoardRepository;
import com.web.ndolphin.repository.FavoriteRepository;
import com.web.ndolphin.repository.TokenRepository;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.service.interfaces.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final FavoriteRepository favoriteRepository;
    private final JwtProvider jwtProvider;
    private final TokenRepository tokenRepository;

    @Override
    public ResponseEntity<ResponseDto> signIn(Long userId) {

        User user = null;

        try {
            user = userRepository.findByUserId(userId);
        } catch (Exception e) {
            e.printStackTrace();
        }

        Token token = tokenRepository.findByUserId(userId);

        return OAuth2ResponseDto.success(user.getUserId(), user.getEmail(), token.getAccessToken(), user.getType());
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
    public void removeFavorite(Long userId, Long boardId) {
        Optional<Favorite> favorite = Optional.ofNullable(favoriteRepository.findByUserIdAndBoardId(userId, boardId)
                .orElseThrow(() -> new IllegalArgumentException("Favorite not found")));

        favoriteRepository.delete(favorite.get());
    }

}

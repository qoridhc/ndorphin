package com.web.ndolphin.service.impl;

import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.auth.response.OAuth2ResponseDto;
import com.web.ndolphin.provider.JwtProvider;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    @Override
    public ResponseEntity<ResponseDto> signIn(Long userId) {

        User user = null;

        try {
            user = userRepository.findByUserId(userId);

            String token = jwtProvider.create(String.valueOf(userId));

            user.setToken(token);

        } catch (Exception e) {
            e.printStackTrace();
        }

        userRepository.save(user);

        return OAuth2ResponseDto.success(user.getUserId(), user.getEmail(), user.getToken(), user.getType());
    }



}

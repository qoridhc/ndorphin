package com.web.ndolphin.service;


import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.user.request.UserUpdateRequestDto;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<ResponseDto> signIn(Long userId);

    ResponseEntity<ResponseDto> deleteUser(Long userId);

    ResponseEntity<ResponseDto> updateUser(Long userId, UserUpdateRequestDto dto);
}

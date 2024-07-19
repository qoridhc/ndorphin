package com.web.ndolphin.service;


import com.web.ndolphin.dto.ResponseDto;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<ResponseDto> signIn(Long userId);
}

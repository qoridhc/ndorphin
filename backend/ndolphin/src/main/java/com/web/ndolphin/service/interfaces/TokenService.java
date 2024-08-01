package com.web.ndolphin.service.interfaces;

import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.auth.request.TokenRequestDto;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;

public interface TokenService {

    @Transactional
    ResponseEntity<ResponseDto> reissue(TokenRequestDto requestDto);

    public Long getUserIdFromToken();
}

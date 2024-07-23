package com.web.ndolphin.dto.auth.response;

import com.web.ndolphin.common.ResponseCode;
import com.web.ndolphin.common.ResponseMessage;
import com.web.ndolphin.domain.Token;
import com.web.ndolphin.dto.ResponseDto;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@Setter
public class TokenResponseDto {
    private String accessToken;
    private String refreshToken;

    public TokenResponseDto(Token token) {
        this.accessToken = token.getAccessToken();
        this.refreshToken = token.getRefreshToken();
    }

    public static ResponseEntity<ResponseDto> success(Token token) {

        TokenResponseDto data = new TokenResponseDto(token);
        ResponseDto<TokenResponseDto> responseBody = new ResponseDto<>("SU", "SUCCESS", data);

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> unAuthorized() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.UNAUTHORIZED, ResponseMessage.UNAUTHORIZED);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }
}

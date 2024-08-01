package com.web.ndolphin.dto.auth.response;

import com.web.ndolphin.domain.Token;
import com.web.ndolphin.dto.ResponseDto;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@Setter
@ToString
public class OAuth2ResponseDto {

    private Long userId;
    private boolean isNewUser;
    private String accessToken;
    private String refreshToken;

    public OAuth2ResponseDto(Long userId, boolean isNewUser, Token token) {
        this.accessToken = token.getAccessToken();
        this.refreshToken = token.getRefreshToken();
        this.isNewUser = isNewUser;
        this.userId = userId;
    }

    public static ResponseEntity<ResponseDto> success(Token token) {

        boolean isNewUser = token.getUser().getNickName() == null ? true : false;

        OAuth2ResponseDto data = new OAuth2ResponseDto(token.getUser().getUserId(), isNewUser, token);

        ResponseDto<OAuth2ResponseDto> responseBody = new ResponseDto<>("SU", "Success", data);

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

}

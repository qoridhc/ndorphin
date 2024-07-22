package com.web.ndolphin.dto.auth.response;

import com.web.ndolphin.domain.LoginType;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.util.LogUtil;
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
    private String email;
    private String token;
    private int expirationTime;
    private LoginType type;

    public OAuth2ResponseDto(Long userId, String email, String token, LoginType type) {
        super();
        this.userId = userId;
        this.email = email;
        this.token = token;
        this.type = type;
        this.expirationTime = 3600;
    }

    public static ResponseEntity<ResponseDto> success(Long userId, String email, String token, LoginType type) {
        OAuth2ResponseDto data = new OAuth2ResponseDto(userId, email, token, type);

        ResponseDto<OAuth2ResponseDto> responseBody = new ResponseDto<>("SU", "Success", data);


        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

}

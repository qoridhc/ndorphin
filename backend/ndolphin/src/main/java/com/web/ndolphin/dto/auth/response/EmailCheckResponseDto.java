package com.web.ndolphin.dto.auth.response;

import com.web.ndolphin.common.ResponseCode;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.common.ResponseMessage;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class EmailCheckResponseDto extends ResponseDto {

    private EmailCheckResponseDto(){
        // 부모 생성자 호출 -> code , meessage : ResponseCode.SUCCESS
        super();
    }

    public static ResponseEntity<EmailCheckResponseDto> success() {
        EmailCheckResponseDto responseBody = new EmailCheckResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> duplicateEmail() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.DUPLICATE_EMAIL, ResponseMessage.DUPLICATE_EMAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

}

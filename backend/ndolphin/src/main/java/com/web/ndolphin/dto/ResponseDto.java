package com.web.ndolphin.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.web.ndolphin.common.ResponseCode;
import com.web.ndolphin.common.ResponseMessage;
import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)  // null 값을 가진 필드는 JSON에 포함되지 않도록 설정
public class ResponseDto<T> {

    private String code;
    private String message;
    private T data;
    private String errorDetail;

    // 기본 생성자
    public ResponseDto(String code, String message) {
        this.code = code;
        this.message = message;
    }

    // 사용자 정의 생성자 (모든 필드를 지정할 수 있는 생성자)
    public ResponseDto(String code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public ResponseDto(String code, String message, String errorDetail) {
        this.code = code;
        this.message = message;
        this.errorDetail = errorDetail;
    }

    public static ResponseEntity<ResponseDto> success() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> databaseError() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.DATABASE_ERROR,
            ResponseMessage.DATABASE_ERROR);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> databaseError(String errorInfo) {
        ResponseDto responseBody = new ResponseDto(ResponseCode.DATABASE_ERROR,
            ResponseMessage.DATABASE_ERROR, errorInfo);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> validationFail() {

        ResponseDto responseBody = new ResponseDto(
            ResponseCode.VALIDATION_FAIL,
            ResponseMessage.VALIDATION_FAIL
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
}

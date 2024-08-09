package com.web.ndolphin.dto.user.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WriterResponseDto {

    private Long userId;

    private String profileImage;

    private String nickName;

    private String mbti;
}

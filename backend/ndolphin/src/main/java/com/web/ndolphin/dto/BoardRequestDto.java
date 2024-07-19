package com.web.ndolphin.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardRequestDto {

    private Long userId;
    private String subject;
    private String content;
    private int hit;
    private String boardType;
}

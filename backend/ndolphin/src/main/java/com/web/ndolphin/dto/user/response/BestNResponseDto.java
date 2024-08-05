package com.web.ndolphin.dto.user.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BestNResponseDto {

    private Long rank;
    private String nickName;
    private Long nPoint;
}

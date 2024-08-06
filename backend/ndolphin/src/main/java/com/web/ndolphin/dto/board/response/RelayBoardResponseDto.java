package com.web.ndolphin.dto.board.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RelayBoardResponseDto extends BoardDto {

    private String summary;
    private String thumbNailUrl;
    private int maxPage;
    private boolean hasParticipated;
    private boolean isFavorite;
}

package com.web.ndolphin.dto.board.response;

import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OkBoardDto extends BoardDto {

    List<String> fileNames = new ArrayList<>();
    List<String> fileUrls = new ArrayList<>();
}

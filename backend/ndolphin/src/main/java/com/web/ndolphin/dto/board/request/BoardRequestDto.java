package com.web.ndolphin.dto.board.request;

import com.web.ndolphin.domain.BoardType;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardRequestDto {

    private String subject;
    private String content;
    private BoardType boardType;
    private List<String> voteContents;
    private int maxPage;
}

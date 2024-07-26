package com.web.ndolphin.dto.board.response;

import com.web.ndolphin.domain.BoardType;
import com.web.ndolphin.dto.user.UserDto;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ByeBoardDto {

    private Long id;
    private Long userId;
    private String subject;
    private String content;
    private int hit;
    private BoardType boardType;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private List<UserDto> userDtoList;
}

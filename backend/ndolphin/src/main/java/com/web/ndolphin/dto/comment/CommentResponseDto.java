package com.web.ndolphin.dto.comment;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CommentResponseDto {

    private String nickName;
    private String content;
    private Long loveCnt = 0L;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String fileUrl;
}

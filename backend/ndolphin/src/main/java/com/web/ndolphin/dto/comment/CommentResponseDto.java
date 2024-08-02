package com.web.ndolphin.dto.comment;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CommentResponseDto {

    private Long commentId;
    private String nickName;
    private String content;
    private Long likeCnt = 0L;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String avatarUrl;
    private String contentFileUrl;
    private boolean isLikedByUser;

    public CommentResponseDto() {

    }

    public CommentResponseDto(Long commentId, String content, Long likeCnt, boolean isLikedByUser) {
        this.commentId = commentId;
        this.content = content;
        this.likeCnt = likeCnt;
        this.isLikedByUser = isLikedByUser;
    }
}

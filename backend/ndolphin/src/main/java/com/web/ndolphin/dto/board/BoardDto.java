package com.web.ndolphin.dto.board;

import com.web.ndolphin.dto.comment.CommentDto;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class BoardDto {

    private Long id;
    private Long userId;
    private String subject;
    private String content;
    private String summary;
    private int hit;
    private String boardType;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<MultipartFile> files;
    private List<CommentDto> comments;
}

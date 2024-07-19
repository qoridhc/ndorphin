package com.web.ndolphin.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class CommentFileInfo {

    @Id @GeneratedValue
    @Column(name = "comment_file_info_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id")
    private Comment comment;

    private String fileName;
    private LocalDateTime createdAt;
}

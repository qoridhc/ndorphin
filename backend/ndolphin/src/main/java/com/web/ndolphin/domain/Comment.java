package com.web.ndolphin.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Comment {

    @Id @GeneratedValue
    @Column(name = "comment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String content;

    @OneToMany(mappedBy = "comment", fetch = FetchType.LAZY)
    private List<CommentFileInfo> commentFileInfos = new ArrayList<>();

    @OneToMany(mappedBy = "comment", fetch = FetchType.LAZY)
    private List<Love> loves = new ArrayList<>();
}

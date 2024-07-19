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
public class VoteContent {

    @Id @GeneratedValue
    @Column(name = "vote_content_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "voteContent", fetch = FetchType.LAZY)
    private List<Vote> votes = new ArrayList<>();

    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

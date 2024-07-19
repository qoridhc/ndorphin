package com.web.ndolphin.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Vote {

    @Id @GeneratedValue
    @Column(name = "vote_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vote_content_id")
    private VoteContent voteContent;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

package com.web.ndolphin.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Reaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reaction_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @Enumerated(EnumType.STRING)
    private ReactionType reactionType;

    private LocalDateTime createdAt;
}

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
public class PointRule {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "point_rule_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private Reason reason;

    private int Point;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "pointRule", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<NPoint> nPoints = new ArrayList<>();
}

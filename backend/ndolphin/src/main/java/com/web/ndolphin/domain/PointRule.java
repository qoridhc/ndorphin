package com.web.ndolphin.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class PointRule extends DateEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "point_rule_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private Reason reason;

    private int Point;

    @OneToMany(mappedBy = "pointRule", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<NPoint> nPoints = new ArrayList<>();
}

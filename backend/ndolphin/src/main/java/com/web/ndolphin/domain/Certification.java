package com.web.ndolphin.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Certification {

    @Id @GeneratedValue
    @Column(name = "certification_id")
    private Long id;

    /*@OneToOne(mappedBy = "certification", fetch = FetchType.LAZY)
    private User user;*/

    private String Email;
    private String certificationNumber;
}

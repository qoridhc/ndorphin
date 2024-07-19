package com.web.ndolphin.domain;

import com.web.ndolphin.dto.auth.request.SignUpRequestDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId; //user_id

    private String email;

    private String password;

    private String profileImage;

    private String nickName;

    private String mbti;

    private int nPoint;

    private int type;

    private RoleType role;

    private String token;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime nickNameUpdatedAt;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Board> boards = new ArrayList<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Reaction> reactions = new ArrayList<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<VoteContent> voteContents = new ArrayList<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Vote> votes = new ArrayList<>();

    //
    @OneToMany(mappedBy = "follower", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Follow> followers = new ArrayList<>();

    @OneToMany(mappedBy = "following", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Follow> followings = new ArrayList<>();
    //

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "certification_id")
    private Certification certification;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Favorite> favorites = new ArrayList<>();

    @OneToMany(mappedBy = "user",  cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Love> loves = new ArrayList<>();
    // 회원가입을 위한 생성자
    // 회원가입을 위한 기본 정보 생성
    public User(SignUpRequestDto dto) {
        this.email = dto.getEmail();
        this.password = dto.getPassword();
        this.role = RoleType.USER;
    }
}

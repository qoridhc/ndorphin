package com.web.ndolphin.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class FileInfo {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "file_info_id")
    private Long id;

    private String fileName;

    private String fileUrl;

    private int fileSize;

    private String fileType;

    private EntityType entityType;

    private int entityId;

    private LocalDateTime createdAt;

    private LocalDateTime updateAt;
}

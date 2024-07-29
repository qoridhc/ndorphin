package com.web.ndolphin.dto.file.response;

import com.web.ndolphin.domain.EntityType;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileInfoResponseDto {

    private Long id;

    private String fileName;

    private String fileUrl;

    private int fileSize;

    private String fileType;

    private EntityType entityType;

    private Long entityId;

    private LocalDateTime createdAt;

    private LocalDateTime updateAt;

    @Override
    public String toString() {
        return "FileInfoResponseDto{" +
            "id=" + id +
            ", fileName='" + fileName + '\'' +
            ", fileUrl='" + fileUrl + '\'' +
            ", fileSize=" + fileSize +
            ", fileType='" + fileType + '\'' +
            ", entityType=" + entityType +
            ", entityId=" + entityId +
            ", createdAt=" + createdAt +
            ", updateAt=" + updateAt +
            '}';
    }
}

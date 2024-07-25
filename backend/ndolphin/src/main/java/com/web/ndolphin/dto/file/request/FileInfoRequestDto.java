package com.web.ndolphin.dto.file.request;

import com.web.ndolphin.domain.EntityType;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class FileInfoRequestDto {

    private EntityType entityType;
    private List<MultipartFile> multipartFiles;
}

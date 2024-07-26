package com.web.ndolphin.service;

import com.web.ndolphin.domain.EntityType;
import java.io.IOException;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface FileInfoService {

    void uploadAndSaveFiles(Long entityId, EntityType entityType, List<MultipartFile> multipartFiles)
        throws IOException;

    // TODO: void findBy entityId, entityType...
    void deleteAndDeleteFiles(Long entityId, EntityType entityType) throws IOException;

    void deleteAndDeleteFiles(Long entityId, EntityType entityType, List<String> fileNamesToDelete) throws IOException;
}

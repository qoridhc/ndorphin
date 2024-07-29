package com.web.ndolphin.service;

import com.web.ndolphin.domain.EntityType;
import com.web.ndolphin.dto.file.response.FileInfoResponseDto;
import java.io.IOException;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface S3Service {

    FileInfoResponseDto uploadSingleFile(Long entityId, EntityType entityType,
        MultipartFile multipartFile) throws IOException;

    List<FileInfoResponseDto> uploadMultipleFiles(Long entityId, EntityType entityType,
        List<MultipartFile> multipartFiles) throws IOException;

    void deleteSingleFile(String fileName, String fileType) throws IOException;
}

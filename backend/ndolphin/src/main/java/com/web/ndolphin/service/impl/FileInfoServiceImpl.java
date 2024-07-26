package com.web.ndolphin.service.impl;

import com.web.ndolphin.domain.EntityType;
import com.web.ndolphin.domain.FileInfo;
import com.web.ndolphin.dto.file.response.FileInfoResponseDto;
import com.web.ndolphin.repository.FileInfoRepository;
import com.web.ndolphin.service.FileInfoService;
import com.web.ndolphin.service.S3Service;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class FileInfoServiceImpl implements FileInfoService {

    private final S3Service s3Service;
    private final FileInfoRepository fileInfoRepository;

    @Override
    public void uploadAndSaveFiles(Long entityId, EntityType entityType, List<MultipartFile> multipartFiles)
        throws IOException {

        // upload to AWS S3
        List<FileInfoResponseDto> fileInfoResponseDtos = s3Service.uploadMultipleFiles(entityId, entityType,
            multipartFiles);

        // save to MySQL
        for (int i = 0; i < fileInfoResponseDtos.size(); i++) {
            System.out.println("fileInfoResponseDtos.get(i) " + fileInfoResponseDtos);

            FileInfo fileInfo = new FileInfo();

            fileInfo.setFileName(fileInfoResponseDtos.get(i).getFileName());
            fileInfo.setFileUrl(fileInfoResponseDtos.get(i).getFileUrl());
            fileInfo.setFileSize(fileInfoResponseDtos.get(i).getFileSize());
            fileInfo.setFileType(fileInfoResponseDtos.get(i).getFileType());

            fileInfo.setEntityType(fileInfoResponseDtos.get(i).getEntityType());

            fileInfo.setEntityId(fileInfoResponseDtos.get(i).getEntityId());
            fileInfo.setCreatedAt(fileInfoResponseDtos.get(i).getCreatedAt());
            fileInfo.setUpdateAt(fileInfoResponseDtos.get(i).getUpdateAt());

            fileInfoRepository.save(fileInfo);
        }
    }

    
}

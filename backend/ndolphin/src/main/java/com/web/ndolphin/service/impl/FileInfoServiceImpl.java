package com.web.ndolphin.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.ndolphin.domain.EntityType;
import com.web.ndolphin.domain.FileInfo;
import com.web.ndolphin.dto.file.response.FileInfoResponseDto;
import com.web.ndolphin.mapper.FileInfoMapper;
import com.web.ndolphin.repository.FileInfoRepository;
import com.web.ndolphin.service.interfaces.FileInfoService;
import com.web.ndolphin.service.interfaces.S3Service;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class FileInfoServiceImpl implements FileInfoService {

    private final S3Service s3Service;
    private final FileInfoRepository fileInfoRepository;
    private final ObjectMapper objectMapper;

    @Transactional(readOnly = true)
    public List<FileInfoResponseDto> getFileInfos(Long entityId, EntityType entityType) {

        List<FileInfo> fileInfos = fileInfoRepository.findByEntityIdAndEntityType(entityId,
            entityType);
        List<FileInfoResponseDto> fileInfoResponseDtos = new ArrayList<>();
        for (FileInfo fileInfo : fileInfos) {
            fileInfoResponseDtos.add(FileInfoMapper.toDto(fileInfo));
        }

        return fileInfoResponseDtos;
    }

    @Transactional
    public void uploadDallEFile(Long entityId, EntityType entityType, String url) {

        FileInfo fileInfo = new FileInfo();

        fileInfo.setFileName("dalle-generated_" + url);
        fileInfo.setFileUrl(url);
        fileInfo.setEntityType(entityType);
        fileInfo.setEntityId(entityId);

        fileInfoRepository.save(fileInfo);
    }

    @Transactional
    public void uploadAndSaveFiles(Long entityId, EntityType entityType,
        List<MultipartFile> multipartFiles)
        throws IOException {

        // upload to AWS S3
        List<FileInfoResponseDto> fileInfoResponseDtos = s3Service.uploadMultipleFiles(entityId,
            entityType, multipartFiles);

        // save to MySQL
        for (int i = 0; i < fileInfoResponseDtos.size(); i++) {
            System.out.println("fileInfoResponseDtos.get(i) " + fileInfoResponseDtos);

            FileInfo fileInfo = new FileInfo();

            fileInfo = FileInfoMapper.toEntity(fileInfoResponseDtos.get(i));

            fileInfoRepository.save(fileInfo);
        }
    }

    @Transactional
    public void deleteAndDeleteFiles(Long entityId, EntityType entityType) throws IOException {

        // 파일 정보 검색
        List<FileInfo> fileInfos = fileInfoRepository.findByEntityIdAndEntityType(entityId,
            entityType);

        // 파일 정보 삭제
        for (FileInfo fileInfo : fileInfos) {
            if (fileInfo.getFileName().contains("dalle-generated")) {
                System.out.println("DALL-E URL이므로 S3에서 삭제하지 않음: " + fileInfo.getFileUrl());
            } else {
                System.out.println("AWS S3 bucket에서 삭제");
                // AWS S3 bucket에서 삭제
                s3Service.deleteSingleFile(fileInfo.getFileName(), fileInfo.getFileType());
            }
            // 데이터베이스에서 파일 정보 삭제
            fileInfoRepository.delete(fileInfo);
        }
    }

    @Transactional
    public void deleteAndDeleteFiles(Long entityId, EntityType entityType,
        List<String> fileNamesToDelete)
        throws IOException {

        List<FileInfo> fileInfos = new ArrayList<>();
        // 파일 정보 검색
        for (String s : fileNamesToDelete) {
            fileInfos.add(fileInfoRepository.findByEntityIdAndFileName(entityId, s));
        }

        // 파일 정보 삭제
        for (FileInfo fileInfo : fileInfos) {
            // AWS S3 bucket에서 삭제
            s3Service.deleteSingleFile(fileInfo.getFileName(), fileInfo.getFileType());
            // 데이터베이스에서 파일 정보 삭제
            fileInfoRepository.delete(fileInfo);
        }
    }

    public void deleteFiles(Long entityId, EntityType entityType, List<String> fileNamesToDelete)
        throws IOException {

        if (fileNamesToDelete != null && !fileNamesToDelete.isEmpty()) {
            deleteAndDeleteFiles(entityId, entityType, fileNamesToDelete);
        }
    }

    public void deleteFiles(Long entityId, EntityType entityType)
        throws IOException {

        deleteAndDeleteFiles(entityId, entityType);
    }

    public void uploadFiles(Long entityId, EntityType entityType,
        List<MultipartFile> multipartFiles) throws IOException {

        if (multipartFiles != null && !multipartFiles.isEmpty()) {
            uploadAndSaveFiles(entityId, entityType, multipartFiles);
        }
    }

    public List<String> parseDeleteFilesJson(String deleteFilesJson) {

        if (deleteFilesJson == null) {
            return Collections.emptyList();
        }

        try {
            return objectMapper.readValue(deleteFilesJson, new TypeReference<>() {
            });
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Invalid JSON format for deleteFiles", e);
        }
    }

    public String getFileUrl(Long Id, EntityType entityType) {

        List<FileInfoResponseDto> file = getFileInfos(Id, entityType);

        String url = null;
        if (!file.isEmpty()) {
            url = file.get(0).getFileUrl();
        }

        return url;
    }

    public String getFileName(Long Id, EntityType entityType) {

        List<FileInfoResponseDto> file = getFileInfos(Id, entityType);

        String name = null;
        if (!file.isEmpty()) {
            name = file.get(0).getFileName();
        }

        return name;
    }
}

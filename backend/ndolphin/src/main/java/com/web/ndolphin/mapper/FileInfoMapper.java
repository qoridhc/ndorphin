package com.web.ndolphin.mapper;

import com.web.ndolphin.domain.FileInfo;
import com.web.ndolphin.dto.file.response.FileInfoResponseDto;

public class FileInfoMapper {

    public static FileInfoResponseDto toDto(FileInfo fileInfo) {
        if (fileInfo == null) {
            return null;
        }

        FileInfoResponseDto dto = new FileInfoResponseDto();

        dto.setId(fileInfo.getId());
        dto.setFileName(fileInfo.getFileName());
        dto.setFileUrl(fileInfo.getFileUrl());
        dto.setFileSize(fileInfo.getFileSize());
        dto.setFileType(fileInfo.getFileType());
        dto.setEntityType(fileInfo.getEntityType());
        dto.setEntityId(fileInfo.getEntityId());
        dto.setCreatedAt(fileInfo.getCreatedAt());
        dto.setUpdateAt(fileInfo.getUpdatedAt());

        return dto;
    }

    public static FileInfo toEntity(FileInfoResponseDto dto) {
        if (dto == null) {
            return null;
        }

        FileInfo fileInfo = new FileInfo();

        fileInfo.setId(dto.getId());
        fileInfo.setFileName(dto.getFileName());
        fileInfo.setFileUrl(dto.getFileUrl());
        fileInfo.setFileSize(dto.getFileSize());
        fileInfo.setFileType(dto.getFileType());
        fileInfo.setEntityType(dto.getEntityType());
        fileInfo.setEntityId(dto.getEntityId());

        return fileInfo;
    }
}

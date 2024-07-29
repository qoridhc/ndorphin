package com.web.ndolphin.mapper;

import com.web.ndolphin.domain.FileInfo;
import com.web.ndolphin.dto.file.response.FileInfoResponseDto;

public class FileInfoMapper {

    public static FileInfoResponseDto toDto(FileInfo fileInfo) {
        if (fileInfo == null) {
            return null;
        }

        FileInfoResponseDto dto = new FileInfoResponseDto();

//        dto.setId(fileInfo.getId());
        dto.setFileName(fileInfo.getFileName());
        dto.setFileUrl(fileInfo.getFileUrl());
        dto.setFileSize(fileInfo.getFileSize());
        dto.setFileType(fileInfo.getFileType());
        dto.setEntityType(fileInfo.getEntityType());
        dto.setEntityId(fileInfo.getEntityId());
        dto.setCreatedAt(fileInfo.getCreatedAt());
        dto.setUpdateAt(fileInfo.getUpdateAt());

        return dto;
    }

//    public static FileInfo toEntity(FileInfoRequestDto dto) {
//        if (dto == null) {
//            return null;
//        }
//
//        FileInfo fileInfo = new FileInfo();
//        // Here you need to handle the multipartFiles appropriately
//        // Assuming you have methods to get these details from the MultipartFile
//        // fileInfo.setFileName(dto.getMultipartFiles().get(0).getOriginalFilename());
//        // fileInfo.setFilePath("some/default/path");
//        // fileInfo.setFileSize(dto.getMultipartFiles().get(0).getSize());
//        // fileInfo.setFileType(dto.getMultipartFiles().get(0).getContentType());
//
//        fileInfo.setEntityType(dto.getEntityType());
//        fileInfo.setEntityId(dto.getEntityId());
//
//        return fileInfo;
//    }
}

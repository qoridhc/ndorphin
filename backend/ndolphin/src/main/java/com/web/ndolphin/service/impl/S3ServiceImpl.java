package com.web.ndolphin.service.impl;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ListObjectsV2Result;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.web.ndolphin.domain.EntityType;
import com.web.ndolphin.dto.file.response.FileInfoResponseDto;
import com.web.ndolphin.service.interfaces.S3Service;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Slf4j
public class S3ServiceImpl implements S3Service {

    @Value("${cloud.aws.s3.bucketName}")
    private String bucket;
    private final AmazonS3 amazonS3;

    public FileInfoResponseDto uploadSingleFile(Long entityId, EntityType entityType,
        MultipartFile multipartFile)
        throws IOException {

        String contentType = "";
        String folder = "";
        String fileName = multipartFile.getOriginalFilename();

        // 파일 형식 구하기
        String ext = fileName.substring(fileName.lastIndexOf(".") + 1);

        // content type을 지정해서 올려주지 않으면 자동으로 "application/octet-stream"으로 고정이 되서 링크 클릭시 웹에서 열리는게 아니라 자동 다운이 시작됨.
        switch (ext) {
            case "jpeg":
                contentType = "imagex/jpeg";
                folder = "image/";
                break;
            case "jpg":
                contentType = "image/jpg";
                folder = "image/";
                break;
            case "png":
                contentType = "image/png";
                folder = "image/";
                break;
            case "txt":
                contentType = "text/plain";
                folder = "text/";
                break;
            case "csv":
                contentType = "text/csv";
                folder = "csv/";
                break;
            default:
                contentType = "application/octet-stream";
                break;
        }

//      고유한 파일 이름을 생성합니다.
        String timeId = String.valueOf(System.currentTimeMillis());
        String fullFileName = folder + timeId + "_" + fileName;


        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(contentType);
            metadata.setContentLength(multipartFile.getSize());
            amazonS3.putObject(
                new PutObjectRequest(bucket, fullFileName, multipartFile.getInputStream(), metadata).withCannedAcl(
                    CannedAccessControlList.PublicRead));
//
//            System.out.println("AWS S3 성공!!!");
//            System.out.println("fullFileName = " + fullFileName);
        } catch (AmazonServiceException e) {
            e.printStackTrace();
        } catch (SdkClientException e) {
            e.printStackTrace();
        }

        String fileUrl = amazonS3.getUrl(bucket, fullFileName).toString();

        FileInfoResponseDto fileInfoResponseDto = new FileInfoResponseDto();
        fileInfoResponseDto.setFileName(fileName);
//        log.info("fileName = {}", fileName);
        fileInfoResponseDto.setFileUrl(fileUrl);
//        log.info("fileUrl = {}", fileUrl);
        fileInfoResponseDto.setFileSize((int) multipartFile.getSize());
        fileInfoResponseDto.setFileType(contentType);
        fileInfoResponseDto.setEntityType(entityType);
        fileInfoResponseDto.setEntityId(entityId);
        fileInfoResponseDto.setCreatedAt(LocalDateTime.now());
        fileInfoResponseDto.setUpdateAt(LocalDateTime.now());

        return fileInfoResponseDto;
    }

    public List<FileInfoResponseDto> uploadMultipleFiles(Long entityId, EntityType entityType,
        List<MultipartFile> multipartFiles) throws IOException {

        List<FileInfoResponseDto> fileInfoResponseDtos = new ArrayList<>();

        // 파일 업로드 및 DTO 생성
        for (MultipartFile multipartFile : multipartFiles) {
            FileInfoResponseDto fileInfoResponseDto = uploadSingleFile(entityId, entityType, multipartFile);
            fileInfoResponseDtos.add(fileInfoResponseDto);
        }

        // S3에서 객체 요약 정보 가져오기
        ListObjectsV2Result listObjectsV2Result = amazonS3.listObjectsV2(bucket);
        List<S3ObjectSummary> objectSummaries = listObjectsV2Result.getObjectSummaries();

        // DTO 업데이트
        for (S3ObjectSummary objectSummary : objectSummaries) {
            for (FileInfoResponseDto fileInfoResponseDto : fileInfoResponseDtos) {
                if (fileInfoResponseDto.getFileUrl().contains(objectSummary.getKey())) {
                    fileInfoResponseDto.setFileSize((int) objectSummary.getSize());
                }
            }
        }

        return fileInfoResponseDtos;
    }

    public void deleteSingleFile(String fileName, String fileType) {

        try {

            // fileType에서 '/' 앞부분 추출
            String prefix = fileType.contains("/") ? fileType.substring(0, fileType.indexOf("/")) : fileType;
            // prefix와 fileName을 이어붙여 key 생성
            String key = prefix + "/" + fileName;

            // key를 로그로 출력
//            log.info("Generated key: {}", key);
            // 파일 키를 로그로 출력하여 확인
//            log.info("Deleting file with key: {}", key);

            // S3에서 파일 삭제
            amazonS3.deleteObject(new DeleteObjectRequest(bucket, key));
//            log.info("File deleted successfully: {}", key);
        } catch (AmazonServiceException e) {
            e.printStackTrace();
            throw e;
        } catch (SdkClientException e) {
            e.printStackTrace();
            throw e;
        }
    }
}

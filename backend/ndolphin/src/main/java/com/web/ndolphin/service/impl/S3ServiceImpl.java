package com.web.ndolphin.service.impl;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.*;
import com.web.ndolphin.domain.EntityType;
import com.web.ndolphin.dto.file.response.FileInfoResponseDto;
import com.web.ndolphin.service.S3Service;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.S3Client;

@Service
@RequiredArgsConstructor
@Slf4j
public class S3ServiceImpl implements S3Service {

    @Value("${cloud.aws.s3.bucketName}")
    private String bucket;

    private final AmazonS3 amazonS3;

    // amazonS3.deleteObject(new DeleteObjectRequest(bucket, key));

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
                contentType = "image/jpeg";
                folder = "img/";
                break;
            case "jpg":
                contentType = "image/jpg";
                folder = "img/";
                break;
            case "png":
                contentType = "image/png";
                folder = "img/";
                break;
            case "txt":
                contentType = "text/plain";
                folder = "txt/";
                break;
            case "csv":
                contentType = "text/csv";
                folder = "csv/";
                break;
            default:
                contentType = "application/octet-stream";
                break;
        }

        String fullFileName = folder + fileName;

        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(contentType);
            metadata.setContentLength(multipartFile.getSize());
            amazonS3.putObject(
                new PutObjectRequest(bucket, fullFileName, multipartFile.getInputStream(), metadata).withCannedAcl(
                    CannedAccessControlList.PublicRead));

            System.out.println("AWS S3 성공!!!");
        } catch (AmazonServiceException e) {
            e.printStackTrace();
        } catch (SdkClientException e) {
            e.printStackTrace();
        }

        String fileUrl = amazonS3.getUrl(bucket, fullFileName).toString(); // 폴더 경로가 포함된 파일 URL 반환

        System.out.println("fileUrl = " + fileUrl);

        FileInfoResponseDto fileInfoResponseDto = new FileInfoResponseDto();
        fileInfoResponseDto.setFileName(fileName);
        fileInfoResponseDto.setFileUrl(fileUrl);
        fileInfoResponseDto.setFileSize((int) multipartFile.getSize());
        fileInfoResponseDto.setFileType(contentType);
        fileInfoResponseDto.setEntityType(entityType);
        fileInfoResponseDto.setEntityId(entityId);
        fileInfoResponseDto.setCreatedAt(LocalDateTime.now());
        fileInfoResponseDto.setUpdateAt(LocalDateTime.now());

        System.out.println("fileInfoResponseDto = " + fileInfoResponseDto);

        return fileInfoResponseDto;
    }

    public List<FileInfoResponseDto> uploadMultipleFiles(Long entityId, EntityType entityType,
        List<MultipartFile> multipartFiles) throws IOException {

        List<FileInfoResponseDto> fileInfoResponseDtos = new ArrayList<>();

        // 파일 업로드 및 DTO 생성
        for (MultipartFile multipartFile : multipartFiles) {
            FileInfoResponseDto fileInfoResponseDto = uploadSingleFile(entityId, entityType, multipartFile);
            fileInfoResponseDtos.add(fileInfoResponseDto);
            System.out.println("// 파일 업로드 및 DTO 생성");
            System.out.println("fileInfoResponseDto = " + fileInfoResponseDto);
        }

        // S3에서 객체 요약 정보 가져오기
        ListObjectsV2Result listObjectsV2Result = amazonS3.listObjectsV2(bucket);
        List<S3ObjectSummary> objectSummaries = listObjectsV2Result.getObjectSummaries();

        // DTO 업데이트
        for (S3ObjectSummary objectSummary : objectSummaries) {
            for (FileInfoResponseDto fileInfoResponseDto : fileInfoResponseDtos) {
                if (fileInfoResponseDto.getFileUrl().contains(objectSummary.getKey())) {
                    fileInfoResponseDto.setFileSize((int) objectSummary.getSize());
//                    fileInfoResponseDto.setUpdateAt(LocalDateTime.now());
                }
            }
        }

        return fileInfoResponseDtos;
    }

    public void deleteSingleFile(String fileUrl) {

        try {
            // 버킷 URL 구성
            String bucketUrl = "https://" + bucket + ".s3.amazonaws.com/";
            log.info("bucketUrl: {}", bucketUrl);

            // URL에서 파일의 키를 추출
            String fileKey = fileUrl.replace(bucketUrl, "");

            // 파일 키를 로그로 출력하여 확인
            log.info("DeletingDeleting file with key: {}", fileKey);

            // S3에서 파일 삭제
            amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileKey));
            log.info("File deleted successfully: {}", fileUrl);
        } catch (AmazonServiceException e) {
            log.error("Failed to delete file: {}", fileUrl, e);
            throw e;
        } catch (SdkClientException e) {
            log.error("Failed to delete file: {}", fileUrl, e);
            throw e;
        }
    }

    public void deleteMultipleFiles(List<String> fileUrls){

        for (String fileUrl : fileUrls) {
            try {
                deleteSingleFile(fileUrl);
                log.info("deleteSingleFile(fileUrl): {}", "성공!!!");
            } catch (AmazonServiceException e) {
                log.error("Failed to delete file: {}", fileUrl, e);
                throw e;
            } catch (SdkClientException e) {
                log.error("Failed to delete file: {}", fileUrl, e);
                throw e;
            }
        }
    }
}

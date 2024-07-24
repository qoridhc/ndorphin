/*
package com.web.ndolphin.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class S3Service {
    @Value("${cloud.aws.s3.bucketName}")
    private String bucket;
    private final AmazonS3 amazonS3;

    public String uploadFile(MultipartFile multipartFile) throws IOException {
        String folder = "";
        String fileName = multipartFile.getOriginalFilename();

        //파일 형식 구하기
        String ext = fileName.split("\\.")[1];
        System.out.println("ext = " + ext);
        String contentType = "";


        //content type을 지정해서 올려주지 않으면 자동으로 "application/octet-stream"으로 고정이 되서 링크 클릭시 웹에서 열리는게 아니라 자동 다운이 시작됨.
        switch (ext) {
            case "jpeg":
                contentType = "image/jpeg";
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
        }

        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(contentType);
            System.out.println("folder = " + folder);
            amazonS3.putObject(new PutObjectRequest(bucket, folder + fileName, multipartFile.getInputStream(), metadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (AmazonServiceException e) {
            e.printStackTrace();
        } catch (SdkClientException e) {
            e.printStackTrace();
        }

        //object 정보 가져오기
        ListObjectsV2Result listObjectsV2Result = amazonS3.listObjectsV2(bucket);
        List<S3ObjectSummary> objectSummaries = listObjectsV2Result.getObjectSummaries();

        for (S3ObjectSummary object : objectSummaries) {
            System.out.println("object = " + object.toString());
        }
        return amazonS3.getUrl(bucket, fileName).toString();
    }

    public List<String> allFolders() {
        ListObjectsV2Request listObjectsV2Request = new ListObjectsV2Request().withBucketName(bucket);
        String prefix = listObjectsV2Request.getDelimiter();
        System.out.println(prefix);
        return null;
    }
}*//*

package com.web.ndolphin.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class S3Service {

    @Value("${cloud.aws.s3.bucketName}")
    private String bucket;

    private final AmazonS3 amazonS3;

    public String uploadFile(MultipartFile multipartFile) throws IOException {
        String folder = "";
        String fileName = multipartFile.getOriginalFilename();

        // 파일 형식 구하기
        String ext = fileName.split("\\.")[1];
        System.out.println("ext = " + ext);
        String contentType = "";

        // content type을 지정해서 올려주지 않으면 자동으로 "application/octet-stream"으로 고정이 되서 링크 클릭시 웹에서 열리는게 아니라 자동 다운이 시작됨.
        switch (ext) {
            case "jpeg":
                contentType = "image/jpeg";
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
        }

        String fullFileName = folder + fileName;

        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(contentType);
            System.out.println("folder = " + folder);
            amazonS3.putObject(new PutObjectRequest(bucket, fullFileName, multipartFile.getInputStream(), metadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (AmazonServiceException e) {
            e.printStackTrace();
        } catch (SdkClientException e) {
            e.printStackTrace();
        }

        // object 정보 가져오기
        ListObjectsV2Result listObjectsV2Result = amazonS3.listObjectsV2(bucket);
        List<S3ObjectSummary> objectSummaries = listObjectsV2Result.getObjectSummaries();

        for (S3ObjectSummary object : objectSummaries) {
            System.out.println("object = " + object.toString());
        }
        return amazonS3.getUrl(bucket, fullFileName).toString(); // 폴더 경로가 포함된 파일 URL 반환
    }

    public List<String> allFolders() {
        ListObjectsV2Request listObjectsV2Request = new ListObjectsV2Request().withBucketName(bucket);
        String prefix = listObjectsV2Request.getDelimiter();
        System.out.println(prefix);
        return null;
    }
}
*/

package com.web.ndolphin.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ListObjectsV2Request;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class S3Service {

    @Value("${cloud.aws.s3.bucketName}")
    private String bucket;

    private final AmazonS3 amazonS3;

    public String uploadFile(MultipartFile multipartFile) throws IOException {
        return uploadSingleFile(multipartFile);
    }

    public List<String> uploadFiles(List<MultipartFile> multipartFiles) throws IOException {

        List<String> uploadedUrls = new ArrayList<>();
        for (MultipartFile multipartFile : multipartFiles) {
            String url = uploadSingleFile(multipartFile);
            uploadedUrls.add(url);
        }
        return uploadedUrls;
    }

    private String uploadSingleFile(MultipartFile multipartFile) throws IOException {
        String folder = "";
        String fileName = multipartFile.getOriginalFilename();

        // 파일 형식 구하기
        String ext = fileName.split("\\.")[1];
        System.out.println("ext = " + ext);
        String contentType = "";

        // content type을 지정해서 올려주지 않으면 자동으로 "application/octet-stream"으로 고정이 되서 링크 클릭시 웹에서 열리는게 아니라 자동 다운이 시작됨.
        switch (ext) {
            case "jpeg":
                contentType = "image/jpeg";
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
        }

        String fullFileName = folder + fileName;

        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(contentType);
            System.out.println("folder = " + folder);
            amazonS3.putObject(new PutObjectRequest(bucket, fullFileName, multipartFile.getInputStream(), metadata)
                .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (AmazonServiceException e) {
            e.printStackTrace();
        } catch (SdkClientException e) {
            e.printStackTrace();
        }

        return amazonS3.getUrl(bucket, fullFileName).toString(); // 폴더 경로가 포함된 파일 URL 반환
    }

    public List<String> allFolders() {
        ListObjectsV2Request listObjectsV2Request = new ListObjectsV2Request().withBucketName(bucket);
        String prefix = listObjectsV2Request.getDelimiter();
        System.out.println(prefix);
        return null;
    }
}


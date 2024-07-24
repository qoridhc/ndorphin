package com.web.ndolphin.dto;

import java.util.List;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class FileDto {

    private String title;
    private List<MultipartFile> files; // 여러 파일을 받을 수 있도록 수정
    private List<String> urls; // 각 파일의 URL을 저장할 수 있도록 리스트로 변경
}

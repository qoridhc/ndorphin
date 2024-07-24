package com.web.ndolphin.service;

import com.web.ndolphin.dto.File;
import com.web.ndolphin.dto.FileDto;
import com.web.ndolphin.repository.FileRepository;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FileService {

    private final FileRepository fileRepository;
    private final S3Service s3Service;

    public void save(File file) {
        fileRepository.save(file);
    }

    public List<File> getFiles() {
        return fileRepository.findAll();
    }

    public void uploadAndSaveFiles(FileDto fileDto) throws IOException {
        List<String> urls = s3Service.uploadFiles(fileDto.getFiles());

        for (int i = 0; i < urls.size(); i++) {
            String url = urls.get(i);
            String title = fileDto.getTitle();
            File file = new File(title, url);  // 각 파일의 제목과 URL을 사용하여 File 엔티티 생성
            save(file);
        }
    }
}

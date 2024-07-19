package com.web.ndolphin.service;

import com.web.ndolphin.domain.File;
import com.web.ndolphin.dto.FileDto;
import com.web.ndolphin.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FileService {

    private final FileRepository fileRepository;

    public void save(FileDto fileDto) {
        File file = new File(fileDto.getTitle(), fileDto.getUrl());
        fileRepository.save(file);
    }

    public List<File> getFiles() {
        List<File> all = fileRepository.findAll();
        return all;
    }
}

package com.web.ndolphin.controller;

import com.web.ndolphin.dto.File;
import com.web.ndolphin.dto.FileDto;
import com.web.ndolphin.service.FileService;
import com.web.ndolphin.service.S3Service;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequiredArgsConstructor
public class S3Controller {

    private final S3Service s3Service;
    private final FileService fileService;

    @GetMapping("/api/upload")
    public String goToUpload() {
        return "upload";
    }

    @PostMapping("/api/upload")
    public String uploadFile(@RequestParam("title") String title, @RequestParam("files") List<MultipartFile> files)
        throws IOException {
        FileDto fileDto = new FileDto();
        fileDto.setTitle(title);
        fileDto.setFiles(files);

        fileService.uploadAndSaveFiles(fileDto);
        return "redirect:/api/list";
    }

    @GetMapping("/api/list")
    public String listPage(Model model) {
        List<File> fileList = fileService.getFiles();
        model.addAttribute("fileList", fileList);
        return "list";
    }

    @GetMapping("/api/folder")
    @ResponseBody
    public List<String> listFolder() {
        return s3Service.allFolders();
    }
}

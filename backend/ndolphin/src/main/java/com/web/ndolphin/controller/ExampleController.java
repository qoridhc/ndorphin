package com.web.ndolphin.controller;

import com.web.ndolphin.service.interfaces.OpenAIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/summarize")
public class ExampleController {

    private final OpenAIService openAIService;

    @PostMapping
    public ResponseEntity<String> summarize(@RequestBody String text) {
        try {
            String summary = openAIService.summarizeText(text);
            return ResponseEntity.ok(summary);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error summarizing text: " + e.getMessage());
        }
    }
}

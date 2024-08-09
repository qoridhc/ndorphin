package com.web.ndolphin.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.ndolphin.config.OpenAIConfig;
import com.web.ndolphin.service.interfaces.OpenAIService;
import java.util.Collections;
import lombok.RequiredArgsConstructor;
import okhttp3.*;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OpenAIServiceImpl implements OpenAIService {

    private final OpenAIConfig openAIConfig;
    private final OkHttpClient client = new OkHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String summarizeText(String text) throws IOException {

        // 한국어로 요약하도록 프롬프트 작성
        String prompt = text + "다음 텍스트를 50자 이하로 정리해줘";

        // 요청 바디 구성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", openAIConfig.getModel());
        requestBody.put("messages", Collections.singletonList(
            Map.of("role", "user", "content", prompt)
        ));

        // JSON 형식으로 변환
        String requestJson = objectMapper.writeValueAsString(requestBody);

        // HTTP 요청 생성
        Request request = new Request.Builder()
            .url(openAIConfig.getApiUrl())
            .header("Authorization", "Bearer " + openAIConfig.getApiKey())
            .post(RequestBody.create(requestJson, MediaType.parse("application/json")))
            .build();

        // 요청 실행 및 응답 처리
        try (Response response = client.newCall(request).execute()) {
            if (response.isSuccessful() && response.body() != null) {
                String responseBody = response.body().string();
                JsonNode jsonNode = objectMapper.readTree(responseBody);
                return jsonNode.get("choices").get(0).get("message").get("content").asText().trim();
            } else {
                throw new IOException("Unexpected response: " + response);
            }
        }
    }
}

package com.web.ndolphin.service.interfaces;

import java.io.IOException;

public interface OpenAIService {

    /**
     * 주어진 텍스트를 요약합니다.
     *
     * @param text 요약할 텍스트
     * @return 요약된 텍스트
     * @throws IOException API 호출 중 문제가 발생한 경우
     */
    String summarizeText(String text) throws IOException;
}
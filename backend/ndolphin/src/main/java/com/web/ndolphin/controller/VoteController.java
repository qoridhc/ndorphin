package com.web.ndolphin.controller;

import com.web.ndolphin.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/boards/{boardId}/votes")
public class VoteController {

    private final VoteService voteService;

    @PostMapping
    public ResponseEntity<ResponseDto> addVote(
        @PathVariable Long boardId,
        @RequestBody VoteRequestDto voteRequestDto) {

        ResponseEntity<ResponseDto> response = VoteService.addVote(boardId, voteRequestDto);

        return response;
    }

}

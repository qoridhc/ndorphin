package com.web.ndolphin.controller;

import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.vote.request.VoteRequestDto;
import com.web.ndolphin.service.interfaces.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/boards/{boardId}/votes")
public class VoteController {

    private final VoteService voteService;

    @PostMapping
    public ResponseEntity<ResponseDto> addVote(@RequestBody VoteRequestDto voteRequestDto) {

        ResponseEntity<ResponseDto> response = voteService.addVote(voteRequestDto);

        return response;
    }

    @PutMapping("/{voteId}")
    public ResponseEntity<ResponseDto> updateVote(
        @PathVariable Long voteId,
        @RequestBody VoteRequestDto voteRequestDto) {

        ResponseEntity<ResponseDto> response = voteService.updateVote(voteId,
            voteRequestDto);

        return response;
    }

    @DeleteMapping("/{voteId}")
    public ResponseEntity<ResponseDto> deleteVote(@PathVariable Long voteId) {

        ResponseEntity<ResponseDto> response = voteService.deleteVote(voteId);

        return response;
    }
}
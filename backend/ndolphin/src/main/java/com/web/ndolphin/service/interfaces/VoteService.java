package com.web.ndolphin.service.interfaces;

import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.vote.VoteCount;
import com.web.ndolphin.dto.vote.request.VoteRequestDto;
import java.util.List;
import org.springframework.http.ResponseEntity;

public interface VoteService {

    ResponseEntity<ResponseDto> addVote(VoteRequestDto voteRequestDto);

    ResponseEntity<ResponseDto> updateVote(Long voteId, VoteRequestDto voteRequestDto);

    ResponseEntity<ResponseDto> deleteVote(Long voteId);

    List<VoteCount> getVoteContents(Long boardId);
}

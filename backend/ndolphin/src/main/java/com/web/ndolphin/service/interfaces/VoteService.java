package com.web.ndolphin.service.interfaces;

import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.vote.VoteInfo;
import com.web.ndolphin.dto.vote.request.VoteRequestDto;
import java.util.List;
import org.springframework.http.ResponseEntity;

public interface VoteService {

    ResponseEntity<ResponseDto> addVote(VoteRequestDto voteRequestDto);

    ResponseEntity<ResponseDto> updateVote(Long voteId, VoteRequestDto voteRequestDto);

    ResponseEntity<ResponseDto> deleteVote(Long voteId);

    List<VoteInfo> getVoteContents(Long boardId);
}

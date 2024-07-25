package com.web.ndolphin.service.impl;

import com.web.ndolphin.domain.User;
import com.web.ndolphin.domain.Vote;
import com.web.ndolphin.domain.VoteContent;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.vote.VoteRequestDto;
import com.web.ndolphin.mapper.VoteMapper;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.repository.VoteContentRepository;
import com.web.ndolphin.repository.VoteRepository;
import com.web.ndolphin.service.interfaces.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VoteServiceImpl implements VoteService {

    private final VoteRepository voteRepository;
    private final VoteContentRepository voteContentRepository;
    private final UserRepository userRepository;

    @Override
    public ResponseEntity<ResponseDto> addVote(VoteRequestDto voteRequestDto) {

        try {
            User user = userRepository.findById(voteRequestDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
            VoteContent voteContent = voteContentRepository.findById(
                    voteRequestDto.getVoteContentId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid voteContent ID"));

            Vote vote = VoteMapper.toEntity(voteRequestDto, user, voteContent);

            voteRepository.save(vote);

            return ResponseDto.success(); // 성공 시 응답
        } catch (Exception e) {
            return ResponseDto.databaseError(e.getMessage()); // 예외 발생 시 데이터베이스 에러 응답
        }
    }
}

package com.web.ndolphin.service.impl;

import com.web.ndolphin.common.ResponseCode;
import com.web.ndolphin.common.ResponseMessage;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.domain.Vote;
import com.web.ndolphin.domain.VoteContent;
import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.vote.VoteInfo;
import com.web.ndolphin.dto.vote.request.VoteRequestDto;
import com.web.ndolphin.dto.vote.response.VoteResponseDto;
import com.web.ndolphin.mapper.VoteMapper;
import com.web.ndolphin.repository.UserRepository;
import com.web.ndolphin.repository.VoteContentRepository;
import com.web.ndolphin.repository.VoteRepository;
import com.web.ndolphin.service.interfaces.TokenService;
import com.web.ndolphin.service.interfaces.VoteService;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VoteServiceImpl implements VoteService {

    private final VoteRepository voteRepository;
    private final VoteContentRepository voteContentRepository;
    private final UserRepository userRepository;

    private final TokenService tokenService;

    @Override
    @Transactional
    public ResponseEntity<ResponseDto> addVote(VoteRequestDto voteRequestDto) {

        try {
            Long userId = tokenService.getUserIdFromToken();

            User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));

            VoteContent voteContent = voteContentRepository.findById(
                    voteRequestDto.getVoteContentId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid voteContent ID"));

            Vote vote = VoteMapper.toEntity(voteRequestDto, user, voteContent);
            voteRepository.save(vote);

            return ResponseDto.success();
        } catch (Exception e) {
            return ResponseDto.databaseError(e.getMessage()); // 예외 발생 시 데이터베이스 에러 응답
        }
    }

    @Override
    @Transactional
    public ResponseEntity<ResponseDto> updateVote(Long voteId,
        VoteRequestDto voteRequestDto) {

        try {
            Vote vote = voteRepository.findById(voteId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Vote ID"));
            VoteContent newVoteContent = voteContentRepository.findById(
                    voteRequestDto.getVoteContentId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid newVoteContentId ID"));

            vote.setVoteContent(newVoteContent);
            voteRepository.save(vote);

            Long boardId = newVoteContent.getBoard().getId();
            List<VoteInfo> voteInfos = voteRepository.countVotesByBoardId(boardId);
            VoteResponseDto voteResponseDto = VoteMapper.toDto(vote, voteInfos);

            ResponseDto<VoteResponseDto> responseBody = new ResponseDto<>(
                ResponseCode.SUCCESS,
                ResponseMessage.SUCCESS,
                voteResponseDto
            );

            return ResponseEntity.status(HttpStatus.OK).body(responseBody);
        } catch (Exception e) {
            return ResponseDto.databaseError(e.getMessage()); // 예외 발생 시 데이터베이스 에러 응답
        }
    }

    @Override
    public ResponseEntity<ResponseDto> deleteVote(Long voteId) {

        try {
            voteRepository.deleteById(voteId);

            return ResponseDto.success();
        } catch (Exception e) {
            return ResponseDto.databaseError(e.getMessage());
        }
    }

    public List<VoteInfo> getVoteContents(Long boardId) {

        List<VoteInfo> voteInfos = voteRepository.countVotesByBoardId(boardId);

        return voteInfos;
    }
}

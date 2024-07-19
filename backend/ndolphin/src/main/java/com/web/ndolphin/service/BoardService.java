package com.web.ndolphin.service;

import com.web.ndolphin.domain.Board;
import com.web.ndolphin.domain.BoardType;
import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.BoardRequestDto;
import com.web.ndolphin.dto.BoardResponseDto;
import com.web.ndolphin.repository.BoardRepository;
import com.web.ndolphin.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    @Transactional
    public BoardResponseDto createBoard(BoardRequestDto boardRequestDto) {
        User user = userRepository.findById(boardRequestDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Board board = new Board();
        board.setUser(user);
        board.setSubject(boardRequestDto.getSubject());
        board.setContent(boardRequestDto.getContent());
        board.setHit(boardRequestDto.getHit());
        board.setBoardType(BoardType.valueOf(boardRequestDto.getBoardType()));
        board.setCreatedAt(LocalDateTime.now());
        board.setUpdatedAt(LocalDateTime.now());

        Board savedBoard = boardRepository.save(board);
        return convertToResponseDto(savedBoard);
    }

    @Transactional(readOnly = true)
    public List<BoardResponseDto> getAllBoards() {
        List<Board> boards = boardRepository.findAll();
        List<BoardResponseDto> boardResponseDtos = new ArrayList<>();

        for (Board board : boards) {
            if (board.getUser() == null) {
                continue; // or handle appropriately
            }
            boardResponseDtos.add(convertToResponseDto(board));
        }

        return boardResponseDtos;
    }

    @Transactional(readOnly = true)
    public BoardResponseDto getBoardById(Long id) {
        Board board = boardRepository.findById(id).orElseThrow(() -> new RuntimeException("Board not found"));
        return convertToResponseDto(board);
    }

    @Transactional
    public BoardResponseDto updateBoard(Long id, BoardRequestDto boardRequestDto) {
        Board board = boardRepository.findById(id).orElseThrow(() -> new RuntimeException("Board not found"));

        board.setSubject(boardRequestDto.getSubject());
        board.setContent(boardRequestDto.getContent());
        board.setHit(boardRequestDto.getHit());
        board.setBoardType(BoardType.valueOf(boardRequestDto.getBoardType()));
        board.setUpdatedAt(LocalDateTime.now());

        Board updatedBoard = boardRepository.save(board);
        return convertToResponseDto(updatedBoard);
    }

    @Transactional
    public void deleteBoard(Long id) {
        boardRepository.deleteById(id);
    }

    private BoardResponseDto convertToResponseDto(Board board) {
        BoardResponseDto responseDto = new BoardResponseDto();
        System.out.println("board.getUser() = " + board.getUser());

        responseDto.setId(board.getId());
        responseDto.setSubject(board.getSubject());
        responseDto.setContent(board.getContent());
        responseDto.setHit(board.getHit());
        responseDto.setBoardType(board.getBoardType().name());
        responseDto.setCreatedAt(board.getCreatedAt());
        responseDto.setUpdatedAt(board.getUpdatedAt());

        responseDto.setUserId(board.getUser().getUserId());
        return responseDto;
    }
}

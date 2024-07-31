package com.web.ndolphin.service.interfaces;

import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.comment.CommentRequestDto;
import com.web.ndolphin.dto.comment.CommentResponseDto;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface CommentService {

    ResponseEntity<ResponseDto> addComment(Long boardId, CommentRequestDto commentRequestDto,
        List<MultipartFile> multipartFiles);

    ResponseEntity<ResponseDto> updateComment(Long commentId, CommentRequestDto commentRequestDto,
        List<MultipartFile> multipartFiles, String deleteFilesJson);

    ResponseEntity<ResponseDto> deleteComment(Long commentId);

    ResponseEntity<ResponseDto> likeComment(Long commentId);

    ResponseEntity<ResponseDto> unlikeComment(Long commentId);

    List<CommentResponseDto> getBoardDetail(Long boardId);
}

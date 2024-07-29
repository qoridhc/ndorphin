package com.web.ndolphin.service.interfaces;

import com.web.ndolphin.dto.ResponseDto;
import com.web.ndolphin.dto.comment.CommentRequestDto;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface CommentService {

    ResponseEntity<ResponseDto> addComment(HttpServletRequest request, Long boardId,
        CommentRequestDto commentRequestDto, List<MultipartFile> multipartFiles);

    ResponseEntity<ResponseDto> updateComment(Long commentId, CommentRequestDto commentRequestDto,
        List<MultipartFile> multipartFiles, List<String> fileNamesToDelete);

    ResponseEntity<ResponseDto> deleteComment(Long commentId);

    ResponseEntity<ResponseDto> likeComment(HttpServletRequest request, Long commentId);

    ResponseEntity<ResponseDto> unlikeComment(HttpServletRequest request, Long commentId);
}

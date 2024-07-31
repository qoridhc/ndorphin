package com.web.ndolphin.repository;

import com.web.ndolphin.domain.Comment;
import com.web.ndolphin.dto.ResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("SELECT COUNT(l) " +
        "FROM Likes l " +
        "WHERE l.comment.id = :commentId")
    Long countLovesByCommentId(@Param("commentId") Long commentId);

    List<Comment> findByBoardId(Long boardId);
}


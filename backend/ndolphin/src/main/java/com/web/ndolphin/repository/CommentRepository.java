package com.web.ndolphin.repository;

import com.web.ndolphin.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("SELECT COUNT(l) " +
        "FROM Love l " +
        "WHERE l.comment.id = :commentId")
    Long countLovesByCommentId(@Param("commentId") Long commentId);

}


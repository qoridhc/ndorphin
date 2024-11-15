package com.web.ndolphin.repository;

import com.web.ndolphin.domain.Comment;
import java.util.List;
import org.springframework.data.domain.Pageable;
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

    @Query("SELECT c.content FROM Comment c " +
        "LEFT JOIN c.likes l " +
        "WHERE c.board.id = :boardId " +
        "GROUP BY c.id, c.content " +
        "ORDER BY COUNT(l.id) DESC, c.id DESC")
    List<String> findTopCommentContentByLikes(@Param("boardId") Long boardId, Pageable pageable);

    @Query("SELECT COUNT(c) FROM Comment c WHERE c.board.id = :boardId")
    Long countCommentsByBoardId(@Param("boardId") Long boardId);

    @Query("SELECT COUNT(c) > 0 FROM Comment c WHERE c.board.id = :boardId AND c.user.userId = :userId")
    boolean existsByBoardIdAndUserId(@Param("boardId") Long boardId, @Param("userId") Long userId);

    List<Comment> findByBoardId(Long boardId);
}


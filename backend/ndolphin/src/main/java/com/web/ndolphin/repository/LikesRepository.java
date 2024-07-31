package com.web.ndolphin.repository;

import com.web.ndolphin.domain.Likes;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LikesRepository extends JpaRepository<Likes, Long> {

    // 특정 댓글에 대한 좋아요 개수를 계산하는 메서드
    @Query("SELECT COUNT(l) FROM Likes l WHERE l.comment.id = :commentId")
    long countByCommentId(@Param("commentId") Long commentId);
    Optional<Likes> findByUser_UserIdAndComment_Id(Long userId, Long commentId);
    @Query("SELECT CASE WHEN COUNT(l) > 0 THEN true ELSE false END FROM Likes l WHERE l.user.id = :userId AND l.comment.id = :commentId")
    boolean existsByUserIdAndCommentId(@Param("userId") Long userId, @Param("commentId") Long commentId);
}

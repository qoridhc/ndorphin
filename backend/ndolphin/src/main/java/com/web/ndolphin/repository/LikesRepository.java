package com.web.ndolphin.repository;

import com.web.ndolphin.domain.Likes;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikesRepository extends JpaRepository<Likes, Long> {

    Optional<Likes> findByUser_UserIdAndComment_Id(Long userId, Long commentId);
}

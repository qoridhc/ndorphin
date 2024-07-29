package com.web.ndolphin.repository;

import com.web.ndolphin.domain.Likes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Likes, Long> {

}

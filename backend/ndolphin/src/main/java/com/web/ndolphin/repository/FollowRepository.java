package com.web.ndolphin.repository;

import com.web.ndolphin.domain.Follow;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {

    List<Follow> findAllByFollowing_UserId(Long userId);

    List<Follow> findAllByFollower_UserId(Long userId);
}

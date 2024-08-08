package com.web.ndolphin.repository;

import com.web.ndolphin.domain.Follow;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {

    List<Follow> findAllByFollowing_UserId(Long userId);

    List<Follow> findAllByFollower_UserId(Long userId);

    // followerId와 followingId에 따른 Follow 엔티티를 찾기 위한 메소드
    @Query("SELECT f FROM Follow f WHERE f.follower.userId = :followerId AND f.following.userId = :followingId")
    Optional<Follow> findByFollowerIdAndFollowingId(
        @Param("followerId") Long followerId,
        @Param("followingId") Long followingId
    );

}

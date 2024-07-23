package com.web.ndolphin.repository;

import com.web.ndolphin.domain.User;
import com.web.ndolphin.dto.user.request.UserUpdateRequestDto;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);

    User findByEmail(String email);

    User findByUserId(Long userId);

    int deleteUserByUserId(Long userId);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.email = :email, u.profileImage = :profileImage, u.nickName = :nickName, u.mbti = :mbti, u.nPoint = :nPoint WHERE u.userId = :userId")
    int updateUserByUserId(
            @Param("userId") Long userId,
            @Param("email") String email,
            @Param("profileImage") String profileImage,
            @Param("nickName") String nickName,
            @Param("mbti") String mbti,
            @Param("nPoint") int nPoint
    );
}

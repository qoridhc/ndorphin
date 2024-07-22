package com.web.ndolphin.repository;

import com.web.ndolphin.domain.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TokenRepository extends JpaRepository<Token, Long> {

    @Query("SELECT t FROM Token t WHERE t.user.userId = :userId")
    Token findByUserId(Long userId);

}

package com.web.ndolphin.repository;

import com.web.ndolphin.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);

    User findByEmail(String email);

    User findByUserId(Long id);

}

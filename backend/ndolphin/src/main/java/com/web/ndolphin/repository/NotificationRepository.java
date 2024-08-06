package com.web.ndolphin.repository;

import com.web.ndolphin.domain.Notification;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query("SELECT n FROM Notification n WHERE n.user.userId = :userId")
    List<Notification> findAllByUserId(@Param("userId") Long userId);

    @Query("SELECT COUNT(n) > 0 FROM Notification n WHERE n.user.userId = :userId AND n.isRead = false")
    boolean existsByUserIdAndIsReadFalse(@Param("userId") Long userId);
}

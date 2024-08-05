package com.web.ndolphin.repository;

import com.web.ndolphin.domain.User;
import java.util.List;

public interface UserRepositoryCustom {

    List<User> findTopUsersByNPoint(int limit);
    List<User> findAllUsersSortedByNPoint();
}

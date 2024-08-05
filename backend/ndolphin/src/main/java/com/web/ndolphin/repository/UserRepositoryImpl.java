package com.web.ndolphin.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.web.ndolphin.domain.QUser;
import com.web.ndolphin.domain.User;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<User> findTopUsersByNPoint(int limit) {
        QUser user = QUser.user;

        return queryFactory.selectFrom(user)
            .orderBy(user.nPoint.desc())  // 포인트 기준 내림차순 정렬
            .limit(limit)                // 제한된 수의 사용자만 가져옴
            .fetch();
    }

    @Override
    public List<User> findAllUsersSortedByNPoint() {

        QUser user = QUser.user;

        return queryFactory.selectFrom(user)
            .orderBy(user.nPoint.desc())  // 포인트 기준 내림차순 정렬
            .fetch();                    // 모든 사용자 가져옴
    }
}
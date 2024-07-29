package com.web.ndolphin.repository;

import com.web.ndolphin.domain.PointRule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PointRuleRepository extends JpaRepository<PointRule, Long> {

}

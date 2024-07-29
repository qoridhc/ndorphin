package com.web.ndolphin.repository;


import com.web.ndolphin.domain.NPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NPointRepository extends JpaRepository<NPoint, Long> {


}

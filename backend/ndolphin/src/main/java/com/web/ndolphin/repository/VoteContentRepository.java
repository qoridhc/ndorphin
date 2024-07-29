package com.web.ndolphin.repository;

import com.web.ndolphin.domain.VoteContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteContentRepository extends JpaRepository<VoteContent, Long> {

}

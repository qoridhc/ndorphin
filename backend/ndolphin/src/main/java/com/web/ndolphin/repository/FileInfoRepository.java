package com.web.ndolphin.repository;

import com.web.ndolphin.domain.EntityType;
import com.web.ndolphin.domain.FileInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileInfoRepository extends JpaRepository<FileInfo, Long> {
    List<FileInfo> findByEntityIdAndEntityType(Long entityId, EntityType entityType);
}

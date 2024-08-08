package com.web.ndolphin.repository;

import com.web.ndolphin.domain.EntityType;
import com.web.ndolphin.domain.FileInfo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileInfoRepository extends JpaRepository<FileInfo, Long> {

    // entityId로 FileInfo 찾기
    List<FileInfo> findByEntityId(Long entityId);

    // entityId와 entityType으로 FileInfo 찾기
    List<FileInfo> findByEntityIdAndEntityType(Long entityId, EntityType entityType);

    // fileName으로 FileInfo 찾기
    FileInfo findByFileName(String fileName);

    // entityId와 fileName으로 FileInfo 찾기
    FileInfo findByEntityIdAndFileName(Long entityId, String fileName);
}

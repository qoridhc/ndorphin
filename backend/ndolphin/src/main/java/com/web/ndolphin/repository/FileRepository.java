package com.web.ndolphin.repository;

import com.web.ndolphin.domain.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<File, Long> {

}

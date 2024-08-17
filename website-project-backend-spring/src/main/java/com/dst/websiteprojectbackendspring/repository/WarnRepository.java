package com.dst.websiteprojectbackendspring.repository;

import com.dst.websiteprojectbackendspring.model.warn.Warn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WarnRepository extends JpaRepository<Warn, Long> {

    Warn findByUserId(Long userId);
    List<Warn> findAllByUserId(Long userId);
}

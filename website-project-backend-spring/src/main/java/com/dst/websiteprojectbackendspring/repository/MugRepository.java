package com.dst.websiteprojectbackendspring.repository;

import com.dst.websiteprojectbackendspring.model.product.mug.Mug;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MugRepository extends JpaRepository<Mug, Long> {
}

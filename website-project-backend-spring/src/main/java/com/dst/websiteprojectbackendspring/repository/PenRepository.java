package com.dst.websiteprojectbackendspring.repository;

import com.dst.websiteprojectbackendspring.domain.product.pen.Pen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PenRepository extends JpaRepository<Pen, Long> {
}

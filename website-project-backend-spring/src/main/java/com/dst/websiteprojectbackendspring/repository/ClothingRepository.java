package com.dst.websiteprojectbackendspring.repository;

import com.dst.websiteprojectbackendspring.model.product.clothing.Clothing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClothingRepository extends JpaRepository<Clothing, Long> {
}

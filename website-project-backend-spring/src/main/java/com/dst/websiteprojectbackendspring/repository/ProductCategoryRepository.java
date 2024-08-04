package com.dst.websiteprojectbackendspring.repository;

import com.dst.websiteprojectbackendspring.domain.product_category.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
    List<ProductCategory> findByProductId(Long productId);
}

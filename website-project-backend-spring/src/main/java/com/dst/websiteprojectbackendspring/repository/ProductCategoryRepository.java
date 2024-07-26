package com.dst.websiteprojectbackendspring.repository;

import com.dst.websiteprojectbackendspring.domain.product_category.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
}

package com.dst.websiteprojectbackendspring.repository;

import com.dst.websiteprojectbackendspring.domain.product.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
}

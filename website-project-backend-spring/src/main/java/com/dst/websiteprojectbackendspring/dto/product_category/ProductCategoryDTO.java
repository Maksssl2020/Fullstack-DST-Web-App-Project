package com.dst.websiteprojectbackendspring.dto.product_category;

import com.dst.websiteprojectbackendspring.model.product_category.Category;

public record ProductCategoryDTO(Long id, Category category, Long productId) {
}

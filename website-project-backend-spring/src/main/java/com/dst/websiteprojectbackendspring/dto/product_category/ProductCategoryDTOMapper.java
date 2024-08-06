package com.dst.websiteprojectbackendspring.dto.product_category;

import com.dst.websiteprojectbackendspring.model.product_category.ProductCategory;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class ProductCategoryDTOMapper implements Function<ProductCategory, ProductCategoryDTO> {
    @Override
    public ProductCategoryDTO apply(ProductCategory productCategory) {
        return new ProductCategoryDTO(productCategory.getId(), productCategory.getCategory(), productCategory.getProduct().getId());
    }
}

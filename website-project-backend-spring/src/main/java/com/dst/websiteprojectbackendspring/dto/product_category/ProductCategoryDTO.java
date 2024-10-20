package com.dst.websiteprojectbackendspring.dto.product_category;

import com.dst.websiteprojectbackendspring.model.product_category.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProductCategoryDTO {

    private Long id;
    private Category category;
    private Long productId;
}

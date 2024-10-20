package com.dst.websiteprojectbackendspring.mapper;

import com.dst.websiteprojectbackendspring.dto.product_category.ProductCategoryDTO;
import com.dst.websiteprojectbackendspring.model.product_category.ProductCategory;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProductCategoryDTOMapper {

    private final ModelMapper modelMapper;

    public ProductCategoryDTO mapProductCategoryIntoProductCategoryDTO(ProductCategory productCategory) {
        return modelMapper.map(productCategory, ProductCategoryDTO.class);
    }
}

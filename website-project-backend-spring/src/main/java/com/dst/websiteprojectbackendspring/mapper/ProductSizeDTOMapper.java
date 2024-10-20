package com.dst.websiteprojectbackendspring.mapper;

import com.dst.websiteprojectbackendspring.dto.product_size.ProductSizeDTO;
import com.dst.websiteprojectbackendspring.model.product_size.ProductSize;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProductSizeDTOMapper {

    private final ModelMapper modelMapper;

    public ProductSizeDTO mapProductSizeIntoProductSizeDTO(ProductSize productSize) {
        return modelMapper.map(productSize, ProductSizeDTO.class);
    }
}

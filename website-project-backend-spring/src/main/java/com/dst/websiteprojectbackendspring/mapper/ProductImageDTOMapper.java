package com.dst.websiteprojectbackendspring.mapper;

import com.dst.websiteprojectbackendspring.dto.product_image.ProductImageDTO;
import com.dst.websiteprojectbackendspring.model.product_image.ProductImage;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProductImageDTOMapper {

    private final ModelMapper modelMapper;

    public ProductImageDTO mapProductImageIntoProductImageDTO(ProductImage productImage) {
        return modelMapper.map(productImage, ProductImageDTO.class);
    }
}

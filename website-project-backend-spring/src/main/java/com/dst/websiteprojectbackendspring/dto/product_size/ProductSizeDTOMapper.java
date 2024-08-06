package com.dst.websiteprojectbackendspring.dto.product_size;

import com.dst.websiteprojectbackendspring.model.product_size.ProductSize;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class ProductSizeDTOMapper implements Function<ProductSize, ProductSizeDTO> {
    @Override
    public ProductSizeDTO apply(ProductSize productSize) {
        return new ProductSizeDTO(productSize.getId(), productSize.getSize(), productSize.isAvailable());
    }
}

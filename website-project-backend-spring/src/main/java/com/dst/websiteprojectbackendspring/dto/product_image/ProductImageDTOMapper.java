package com.dst.websiteprojectbackendspring.dto.product_image;

import com.dst.websiteprojectbackendspring.domain.product.product_image.ProductImage;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class ProductImageDTOMapper implements Function<ProductImage, ProductImageDTO> {
    @Override
    public ProductImageDTO apply(ProductImage productImage) {
        return new ProductImageDTO(productImage.getId(), productImage.getImage());
    }
}

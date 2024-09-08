package com.dst.websiteprojectbackendspring.dto.product;

import com.dst.websiteprojectbackendspring.model.product.Product;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class ProductDTOForCardMapper implements Function<Product, ProductDTOForCard> {
    @Override
    public ProductDTOForCard apply(Product product) {
        return new ProductDTOForCard(
                product.getId(),
                product.getTitle(),
                product.getPrice(),
                product.getProductType().toString()
        );
    }
}

package com.dst.websiteprojectbackendspring.dto.product;

import com.dst.websiteprojectbackendspring.model.product.ProductType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProductDTO {

    private Long id;
    private String title;
    private String name;
    private String description;
    private String packageSize;
    private double weight;
    private BigDecimal price;
    private ProductType productType;
}

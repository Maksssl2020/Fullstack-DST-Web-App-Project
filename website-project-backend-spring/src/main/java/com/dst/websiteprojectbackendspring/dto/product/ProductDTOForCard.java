package com.dst.websiteprojectbackendspring.dto.product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProductDTOForCard {
    private Long id;
    private String title;
    private BigDecimal price;
    private String productType;
}

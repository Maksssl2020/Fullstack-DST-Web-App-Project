package com.dst.websiteprojectbackendspring.dto.cart;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CartDTO {
    private Long id;
    private String cartIdentifier;
    private BigDecimal totalPrice;
    private Long discountCodeId;
}

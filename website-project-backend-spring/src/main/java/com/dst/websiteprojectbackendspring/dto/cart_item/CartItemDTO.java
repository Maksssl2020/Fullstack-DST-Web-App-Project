package com.dst.websiteprojectbackendspring.dto.cart_item;

import com.dst.websiteprojectbackendspring.dto.product_item.ProductItemDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CartItemDTO extends ProductItemDTO {
    private Long cartId;
}

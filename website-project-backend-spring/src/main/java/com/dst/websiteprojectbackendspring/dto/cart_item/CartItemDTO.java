package com.dst.websiteprojectbackendspring.dto.cart_item;

import com.dst.websiteprojectbackendspring.model.product_size.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CartItemDTO {
    private Long id;
    private Long mainProductId;
    private String productFullTitle;
    private Size productSize;
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal totalPrice;
    private LocalDateTime dateAdded;
    private byte[] mainImage;
    private Long cartId;
}

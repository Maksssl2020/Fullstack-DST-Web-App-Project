package com.dst.websiteprojectbackendspring.dto.order_item;

import com.dst.websiteprojectbackendspring.dto.product_item.ProductItemDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class OrderItemDTO extends ProductItemDTO {
    private Long orderId;
}

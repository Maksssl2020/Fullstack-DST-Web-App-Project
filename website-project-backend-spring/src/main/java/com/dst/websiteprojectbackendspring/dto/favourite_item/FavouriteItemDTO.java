package com.dst.websiteprojectbackendspring.dto.favourite_item;

import com.dst.websiteprojectbackendspring.model.product_size.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FavouriteItemDTO {

    private Long id;
    private Long mainProductId;
    private String productFullTitle;
    private Size productSize;
    private BigDecimal unitPrice;
    private byte[] mainImage;
    private Long userId;
}

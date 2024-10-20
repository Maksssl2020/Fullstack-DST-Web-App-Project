package com.dst.websiteprojectbackendspring.dto.product_size;

import com.dst.websiteprojectbackendspring.model.product_size.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProductSizeDTO {

    private Long id;
    private Size size;
    private boolean isAvailable;
}

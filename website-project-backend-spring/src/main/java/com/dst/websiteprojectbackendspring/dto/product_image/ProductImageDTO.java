package com.dst.websiteprojectbackendspring.dto.product_image;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProductImageDTO {

    private Long id;
    private byte[] image;
}

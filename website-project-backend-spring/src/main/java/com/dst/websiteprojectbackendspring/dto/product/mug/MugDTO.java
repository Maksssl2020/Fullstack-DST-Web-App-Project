package com.dst.websiteprojectbackendspring.dto.product.mug;

import com.dst.websiteprojectbackendspring.dto.product.ProductDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MugDTO extends ProductDTO {

    private String color;
    private String height;
    private String material;
}

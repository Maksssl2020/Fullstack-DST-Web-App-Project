package com.dst.websiteprojectbackendspring.dto.product.clothing;

import com.dst.websiteprojectbackendspring.dto.product.ProductDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ClothingDTO extends ProductDTO {

    private String color;
    private String productComposition;
    private String productOverprint;
}

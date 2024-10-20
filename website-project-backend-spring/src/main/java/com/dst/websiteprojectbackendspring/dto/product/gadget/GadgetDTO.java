package com.dst.websiteprojectbackendspring.dto.product.gadget;

import com.dst.websiteprojectbackendspring.dto.product.ProductDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class GadgetDTO extends ProductDTO {

    private String type;
    private String material;
}

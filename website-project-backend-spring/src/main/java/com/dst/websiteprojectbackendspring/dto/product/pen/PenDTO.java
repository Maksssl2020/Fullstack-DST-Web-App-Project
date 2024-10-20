package com.dst.websiteprojectbackendspring.dto.product.pen;

import com.dst.websiteprojectbackendspring.dto.product.ProductDTO;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PenDTO extends ProductDTO {

    private String color;
    private String inkColor;
}

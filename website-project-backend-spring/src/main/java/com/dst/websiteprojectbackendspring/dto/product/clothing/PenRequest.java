package com.dst.websiteprojectbackendspring.dto.product.clothing;

import com.dst.websiteprojectbackendspring.dto.product.ProductRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class PenRequest extends ProductRequest {

    private String color;
    private String inkColor;
}

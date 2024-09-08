package com.dst.websiteprojectbackendspring.dto.product.clothing;

import com.dst.websiteprojectbackendspring.dto.product.ProductRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ClothingRequest extends ProductRequest {

    private String color;
    private String productComposition;
    private String productOverprint;
    private List<String> productsSizes;
}
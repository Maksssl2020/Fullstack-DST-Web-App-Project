package com.dst.websiteprojectbackendspring.domain.product.mug;

import com.dst.websiteprojectbackendspring.domain.product.Product;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Mug extends Product {

    @NotEmpty(message = "Color cannot be empty!")
    @NotBlank(message = "Color cannot be blank!")
    private String color;

    @NotEmpty(message = "Height cannot be empty!")
    @NotBlank(message = "Height cannot be blank!")
    private String height;

    @NotEmpty(message = "Material cannot be empty!")
    @NotBlank(message = "Material cannot be blank!")
    private String material;
}

package com.dst.websiteprojectbackendspring.model.product.pen;

import com.dst.websiteprojectbackendspring.model.product.Product;
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
public class Pen extends Product {

    @NotEmpty(message = "Color cannot be empty!")
    @NotBlank(message = "Color cannot be blank!")
    private String color;

    @NotEmpty(message = "Ink type cannot be empty!")
    @NotBlank(message = "Ink type cannot be blank!")
    private String inkColor;
}

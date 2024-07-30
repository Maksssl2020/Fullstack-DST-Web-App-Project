package com.dst.websiteprojectbackendspring.domain.product.gadget;

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
public class Gadget extends Product {
    @NotEmpty(message = "Type cannot be empty!")
    @NotBlank(message = "Type cannot be blank!")
    private String type;

    @NotEmpty(message = "Material cannot be empty!")
    @NotBlank(message = "Material cannot be blank!")
    private String material;
}

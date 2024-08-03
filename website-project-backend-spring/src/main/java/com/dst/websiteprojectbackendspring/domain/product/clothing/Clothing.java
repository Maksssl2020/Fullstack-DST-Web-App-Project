package com.dst.websiteprojectbackendspring.domain.product.clothing;

import com.dst.websiteprojectbackendspring.domain.product.Product;
import com.dst.websiteprojectbackendspring.domain.product_size.ProductSize;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Clothing extends Product {

    @NotEmpty(message = "Color cannot be empty!")
    @NotBlank(message = "Color cannot be blank!")
    private String color;

    @NotEmpty(message = "Composition cannot be empty!")
    @NotBlank(message = "Composition cannot be blank!")
    private String productComposition;

    @NotEmpty(message = "Overprint cannot be empty!")
    @NotBlank(message = "Overprint cannot be blank!")
    private String productOverprint;

    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductSize> productSize;
}

package com.dst.websiteprojectbackendspring.domain.product;

import com.dst.websiteprojectbackendspring.domain.product_category.ProductCategory;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "Title cannot be empty!")
    @NotBlank(message = "Title cannot be blank!")
    private String title;

    @NotEmpty(message = "Name cannot be empty!")
    @NotBlank(message = "Name cannot be blank!")
    private String name;

    @NotEmpty(message = "Description cannot be empty!")
    @NotBlank(message = "Description cannot be blank!")
    private String description;

    @NotEmpty(message = "Size cannot be empty!")
    @NotBlank(message = "Size cannot be blank!")
    private String packageSize;

    @DecimalMin(value = "1.0")
    private double weight;

    @DecimalMin(value = "0.01")
    @NotNull(message = "Price cannot be empty!")
    private BigDecimal price;

    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductCategory> categories;

    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductImage> images;
}

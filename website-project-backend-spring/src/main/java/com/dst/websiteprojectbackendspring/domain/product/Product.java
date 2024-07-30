package com.dst.websiteprojectbackendspring.domain.product;

import com.dst.websiteprojectbackendspring.domain.product_category.ProductCategory;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

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

    @NotEmpty(message = "Weight cannot be empty!")
    @NotBlank(message = "Weight cannot be blank!")
    private String weight;

    @DecimalMin(value = "0.01")
    @NotNull(message = "Price cannot be empty!")
    private BigDecimal price;

    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ProductCategory> categories;

    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductImage> images;
}

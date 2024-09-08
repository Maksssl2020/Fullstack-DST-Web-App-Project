package com.dst.websiteprojectbackendspring.model.product;

import com.dst.websiteprojectbackendspring.model.product.product_image.ProductImage;
import com.dst.websiteprojectbackendspring.model.product_category.ProductCategory;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
@Data
@Builder
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

    @DecimalMin(value = "0.01")
    private double weight;

    @DecimalMin(value = "0.01")
    @NotNull(message = "Price cannot be empty!")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "#,##")
    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    private ProductType productType;

    @JsonManagedReference
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductCategory> categories = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductImage> images = new ArrayList<>();
}

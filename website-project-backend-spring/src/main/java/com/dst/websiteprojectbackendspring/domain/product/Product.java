package com.dst.websiteprojectbackendspring.domain.product;

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

    @NotEmpty(message = "Color cannot be empty!")
    @NotBlank(message = "Color cannot be blank!")
    private String color;

    @NotEmpty(message = "Description cannot be empty!")
    @NotBlank(message = "Description cannot be blank!")
    private String description;

    @NotEmpty(message = "Size cannot be empty!")
    @NotBlank(message = "Size cannot be blank!")
    private String packageSize;

    @NotEmpty(message = "Weight cannot be empty!")
    @NotBlank(message = "Weight cannot be blank!")
    private String weight;

    @NotEmpty(message = "Composition cannot be empty!")
    @NotBlank(message = "Composition cannot be blank!")
    private String productComposition;

    @NotEmpty(message = "Overprint cannot be empty!")
    @NotBlank(message = "Overprint cannot be blank!")
    private String productOverprint;

    @DecimalMin(value = "0.01")
    @NotNull(message = "Price cannot be empty!")
    private BigDecimal price;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private Set<ProductSize> productSize;

    @ElementCollection(targetClass = ProductCategory.class)
    @CollectionTable(name = "product_categories", joinColumns = @JoinColumn(name = "product_id"))
//    @Enumerated(EnumType.STRING)
    @Column(name = "categories")
    private Set<ProductCategory> categories;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductImage> images;
}

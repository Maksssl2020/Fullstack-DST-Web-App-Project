package com.dst.websiteprojectbackendspring.model.product_item;

import com.dst.websiteprojectbackendspring.model.product_size.Size;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@SuperBuilder
@Table(name = "product_items")
@Inheritance(strategy = InheritanceType.JOINED)
public class ProductItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long mainProductId;

    private String productFullTitle;

    @Enumerated(EnumType.STRING)
    private Size productSize;

    private Integer quantity;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "#,##")
    private BigDecimal unitPrice;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "#,##")
    private BigDecimal totalPrice;

    private LocalDateTime dateAdded;

    @Lob
    private byte[] mainImage;
}

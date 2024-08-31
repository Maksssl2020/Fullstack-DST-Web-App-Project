package com.dst.websiteprojectbackendspring.model.cart;

import com.dst.websiteprojectbackendspring.model.cart_item.CartItem;
import com.dst.websiteprojectbackendspring.model.discount_code.DiscountCode;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name = "carts")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String cartIdentifier;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "#,##")
    private BigDecimal totalPrice;

    private LocalDateTime creationDate;

    private LocalDateTime lastUpdateDate;

    private boolean userRegistered;

    @ManyToOne
    private DiscountCode discountCode;

    @JsonIgnore
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CartItem> products;
}

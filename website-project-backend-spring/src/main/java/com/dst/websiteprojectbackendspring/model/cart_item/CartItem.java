package com.dst.websiteprojectbackendspring.model.cart_item;

import com.dst.websiteprojectbackendspring.model.cart.Cart;
import com.dst.websiteprojectbackendspring.model.product_size.Size;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name = "cart_items")
public class CartItem {

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

    @ManyToOne(optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "cart_id", referencedColumnName = "id")
    private Cart cart;
}

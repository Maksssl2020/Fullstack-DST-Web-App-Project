package com.dst.websiteprojectbackendspring.model.discount_code;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "discount_codes")
public class DiscountCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String code;

    @Enumerated(EnumType.STRING)
    private DiscountType discountType;

    private BigDecimal discountValue;
    private BigDecimal minimumOrderValue;
    private LocalDateTime expirationDate;
    private Integer usageLimit;
    private Integer usedCount;
    private boolean isActive;
    private boolean isGlobal;
}

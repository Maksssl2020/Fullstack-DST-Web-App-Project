package com.dst.websiteprojectbackendspring.dto.discount_code;

import com.dst.websiteprojectbackendspring.model.discount_code.DiscountType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DiscountCodeDTO {
    private Long id;
    private String discountCode;
    private DiscountType discountType;
    private BigDecimal discountValue;
    private BigDecimal minimumOrderValue;
    private LocalDateTime expirationDate;
    private int usageLimit;
    private int usedCount;
    private boolean isActive;
    private boolean isGlobal;
}

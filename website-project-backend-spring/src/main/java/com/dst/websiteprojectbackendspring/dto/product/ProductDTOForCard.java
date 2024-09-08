package com.dst.websiteprojectbackendspring.dto.product;

import java.math.BigDecimal;

public record ProductDTOForCard(Long id, String title, BigDecimal price, String productType) {
}

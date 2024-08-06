package com.dst.websiteprojectbackendspring.dto.product_size;

import com.dst.websiteprojectbackendspring.model.product_size.Size;

public record ProductSizeDTO(Long id, Size size, boolean isAvailable) {
}

package com.dst.websiteprojectbackendspring.dto.cart_item;

public record CartItemRequestDTO(Integer quantity, String size, Long productId, String cartIdentifier) {
}

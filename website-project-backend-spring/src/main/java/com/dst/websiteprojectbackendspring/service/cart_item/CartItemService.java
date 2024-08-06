package com.dst.websiteprojectbackendspring.service.cart_item;

import org.springframework.stereotype.Service;

@Service
public interface CartItemService {

    void saveCartItem(Integer quantity, Long productId, Long cartId);
}

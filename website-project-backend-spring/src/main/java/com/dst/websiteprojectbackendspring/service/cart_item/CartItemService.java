package com.dst.websiteprojectbackendspring.service.cart_item;

import com.dst.websiteprojectbackendspring.model.cart_item.CartItem;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CartItemService {

    void saveCartItem(Integer quantity, Long productId, Long cartId);
    List<CartItem> getCartItems(Long cartId);
}

package com.dst.websiteprojectbackendspring.service.cart;

import com.dst.websiteprojectbackendspring.model.cart.Cart;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CartService {

    boolean existsByIdentifier(String cartIdentifier);
    List<Cart> getAllCarts();
    Cart getCartByIdentifier(String cartIdentifier, boolean isUserRegistered);
    Long getCartIdByIdentifier(String cartIdentifier, boolean isUserRegistered);
    Cart addProductToCart(Long cartId, Long productId, Integer quantity);
    Cart findCartById(Long cartId);
    void assignCodeToCart(String cartIdentifier, String discountCodeId);
    void applyDiscountCode(String cartIdentifier, Long userId);
}

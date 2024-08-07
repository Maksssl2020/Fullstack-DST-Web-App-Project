package com.dst.websiteprojectbackendspring.service.cart;

import com.dst.websiteprojectbackendspring.model.cart.Cart;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CartService {

    boolean existsByUsername(String username);
    List<Cart> getAllCarts();
    Cart getCartByCustomerUsername(String customerUsername);
    Cart addProductToCart(Long cartId, Long productId, Integer quantity);
    Cart findCartById(Long cartId);
}

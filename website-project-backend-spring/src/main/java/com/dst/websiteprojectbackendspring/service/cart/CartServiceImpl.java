package com.dst.websiteprojectbackendspring.service.cart;

import com.dst.websiteprojectbackendspring.model.cart.Cart;
import com.dst.websiteprojectbackendspring.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;

    @Override
    public boolean existsByUsername(String username) {
        return cartRepository.existsByCustomerUsername(username);
    }

    @Override
    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    @Override
    public Cart getCart(String customerUsername) {
        if (cartRepository.existsByCustomerUsername(customerUsername)) {
            return cartRepository.findByCustomerUsername(customerUsername);
        } else {
            Cart cart = Cart
                    .builder()
                    .customerUsername(customerUsername)
                    .totalPrice(BigDecimal.ZERO)
                    .build();

            return cartRepository.save(cart);
        }
    }

    @Override
    public Cart addProductToCart(Long cartId, Long productId, Integer quantity) {
        return null;
    }

    @Override
    public Cart findCartById(Long cartId) {
        return null;
    }
}

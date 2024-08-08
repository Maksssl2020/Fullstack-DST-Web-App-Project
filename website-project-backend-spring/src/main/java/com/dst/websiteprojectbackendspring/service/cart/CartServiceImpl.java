package com.dst.websiteprojectbackendspring.service.cart;

import com.dst.websiteprojectbackendspring.model.cart.Cart;
import com.dst.websiteprojectbackendspring.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;

    @Override
    public boolean existsByIdentifier(String cartIdentifier) {
        return cartRepository.existsByCartIdentifier(cartIdentifier);
    }

    @Override
    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    @Override
    public Cart getCartByIdentifier(String cartIdentifier, boolean isUserRegistered) {
        if (cartRepository.existsByCartIdentifier(cartIdentifier)) {
            return cartRepository.findByCartIdentifier(cartIdentifier);
        } else {
            Cart cart = Cart
                    .builder()
                    .cartIdentifier(cartIdentifier)
                    .totalPrice(BigDecimal.ZERO)
                    .creationDate(LocalDateTime.now())
                    .lastUpdateDate(LocalDateTime.now())
                    .isUserRegistered(isUserRegistered)
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

    @Scheduled(cron = "0 0 0 */2 * ?") // at 00:00 every 2 days
    private void deleteNonRegisteredUsersCartsAfterInactivityForTwoDays() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime twoDaysAgo = now.minusDays(2);
        List<Cart> nonRegisteredUsersCarts = cartRepository.findNonRegisteredUsersCarts();

        nonRegisteredUsersCarts.stream()
                .filter(cart -> cart.getLastUpdateDate().isBefore(twoDaysAgo))
                .forEach(cart -> {
                    cartRepository.deleteById(cart.getId());
                });
    }
}

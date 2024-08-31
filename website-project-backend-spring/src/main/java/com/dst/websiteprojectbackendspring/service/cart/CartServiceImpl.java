package com.dst.websiteprojectbackendspring.service.cart;

import com.dst.websiteprojectbackendspring.model.cart.Cart;
import com.dst.websiteprojectbackendspring.model.discount_code.DiscountCode;
import com.dst.websiteprojectbackendspring.repository.CartRepository;
import com.dst.websiteprojectbackendspring.service.discount_code.DiscountCodeServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final DiscountCodeServiceImpl discountCodeService;

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
                    .userRegistered(isUserRegistered)
                    .build();

            return cartRepository.save(cart);
        }
    }

    @Override
    public Long getCartIdByIdentifier(String cartIdentifier, boolean isUserRegistered) {
        if (existsByIdentifier(cartIdentifier)) {
            return cartRepository.findByCartIdentifier(cartIdentifier).getId();
        } else {
            return getCartByIdentifier(cartIdentifier, isUserRegistered).getId();
        }
    }

    @Override
    public Cart addProductToCart(Long cartId, Long productId, Integer quantity) {
        return null;
    }

    @Override
    public Cart findCartById(Long cartId) {
        try {
            return cartRepository.findById(cartId).orElseThrow(ChangeSetPersister.NotFoundException::new);
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void assignCodeToCart(String cartIdentifier, String discountCodeId) {
        Cart foundCart = cartRepository.findByCartIdentifier(cartIdentifier);
        DiscountCode foundDiscountCode = discountCodeService.getDiscountCode(discountCodeId);
        foundCart.setDiscountCode(foundDiscountCode);
        cartRepository.save(foundCart);
    }

    @Override
    public void applyDiscountCode(String cartIdentifier, Long userId) {
        log.info("APPLYING DISCOUNT CODE");
        Cart foundCart = cartRepository.findByCartIdentifier(cartIdentifier);

        if (foundCart.getDiscountCode() != null) {
            String discountCodeId = foundCart.getDiscountCode().getCode();
            boolean isGlobal = foundCart.getDiscountCode().isGlobal();
            applyDiscountCodeDependsOnItAccessibility(discountCodeId, isGlobal, userId);
            foundCart.setDiscountCode(null);
            cartRepository.save(foundCart);
        }
    }

    private void applyDiscountCodeDependsOnItAccessibility(String discountCodeId, boolean isGlobal,  Long userId) {
        if (isGlobal) {
            discountCodeService.applyGlobalDiscount(discountCodeId, userId);
        } else {
            discountCodeService.applyNonGlobalDiscount(discountCodeId);
        }
    }

    public void setCartTotalPrice(Long cartId, BigDecimal totalPrice) {
        try {
            Cart foundCart = cartRepository.findById(cartId).orElseThrow(ChangeSetPersister.NotFoundException::new);
            foundCart.setTotalPrice(totalPrice);
            cartRepository.save(foundCart);
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @Scheduled(cron = "0 0 0 */2 * ?") // at 00:00 every 2 days
    private void deleteNonRegisteredUsersCartsAfterInactivityForTwoDays() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime twoDaysAgo = now.minusDays(2);
        List<Cart> nonRegisteredUsersCarts = cartRepository.findByUserRegisteredFalse();

        nonRegisteredUsersCarts.stream()
                .filter(cart -> cart.getLastUpdateDate().isBefore(twoDaysAgo))
                .forEach(cart -> {
                    cartRepository.deleteById(cart.getId());
                });
    }
}

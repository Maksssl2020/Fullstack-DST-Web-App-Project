package com.dst.websiteprojectbackendspring.service.cart_item;

import com.dst.websiteprojectbackendspring.model.cart.Cart;
import com.dst.websiteprojectbackendspring.model.cart_item.CartItem;
import com.dst.websiteprojectbackendspring.model.product.Product;
import com.dst.websiteprojectbackendspring.model.product_item.ProductItem;
import com.dst.websiteprojectbackendspring.model.product_size.Size;
import com.dst.websiteprojectbackendspring.repository.CartItemRepository;
import com.dst.websiteprojectbackendspring.repository.ProductRepository;
import com.dst.websiteprojectbackendspring.service.cart.CartServiceImpl;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CartItemServiceImpl implements CartItemService {

    private final CartItemRepository cartItemRepository;
    private final CartServiceImpl cartService;
    private final ProductRepository productRepository;

    @Override
    public void saveCartItem(Integer quantity, String size, Long productId, String cartIdentifier, boolean isUserRegistered) throws ChangeSetPersister.NotFoundException {
        Cart cart = cartService.getCartByIdentifier(cartIdentifier, isUserRegistered);
        Product foundProduct = productRepository.findById(productId).orElseThrow(ChangeSetPersister.NotFoundException::new);

        LocalDateTime now = LocalDateTime.now();
        cart.setLastUpdateDate(now);

         if (!isItemCurrentlyInCart(foundProduct.getId(), size, quantity, cart.getId())) {
             CartItem cartItem = buildNewCartItem(quantity, size, foundProduct, now, cart);
             cartItemRepository.save(cartItem);
         }

         updateCartTotalPrice(cart.getId());
    }

    private boolean isItemCurrentlyInCart(Long mainProductId, String size, Integer quantity, Long cartId) {
        List<CartItem> foundCartItemsWithTheSameMainProductId = getCartItemsWithTheSameMainProductId(mainProductId, cartId);

        if (size != null) {
            foundCartItemsWithTheSameMainProductId = getCartItemsWithTheSameSize(size, foundCartItemsWithTheSameMainProductId);
        }

        if (!foundCartItemsWithTheSameMainProductId.isEmpty()) {
            foundCartItemsWithTheSameMainProductId
                    .forEach(foundCartItem -> {
                        Integer newQuantity = quantity + foundCartItem.getQuantity();
                        try {
                            updateItemQuantity(foundCartItem.getId(), newQuantity);
                        } catch (ChangeSetPersister.NotFoundException e) {
                            throw new RuntimeException(e);
                        }
                    });

            return true;
        } else {
            return false;
        }
    }

    private List<CartItem> getCartItemsWithTheSameMainProductId(Long mainProductId, Long cartId) {
        return getCartItemsByCartId(cartId).stream()
                .filter(item -> item.getMainProductId().equals(mainProductId))
                .toList();
    }

    private List<CartItem> getCartItemsWithTheSameSize(String size, List<CartItem> foundProductsWithTheSameTitle) {
        return foundProductsWithTheSameTitle.stream()
                .filter(product -> product.getProductSize().equals(Size.valueOf(size)))
                .toList();
    }

    private static CartItem buildNewCartItem(Integer quantity, String size, Product foundProduct, LocalDateTime now, Cart cart) {
        CartItem.CartItemBuilder<?, ?> cartItem = CartItem.builder()
                .cart(cart)
                .dateAdded(now)
                .totalPrice(foundProduct.getPrice().multiply(new BigDecimal(quantity)))
                .unitPrice(foundProduct.getPrice())
                .mainImage(foundProduct.getImages().getFirst().getImageData())
                .quantity(quantity)
                .productFullTitle(foundProduct.getName())
                .mainProductId(foundProduct.getId());


        if (size != null) {
            cartItem.productSize(Size.valueOf(size));
        }

        return cartItem.build();
    }

    @Override
    public List<CartItem> getCartItemsByCartId(Long cartId) {
        return cartItemRepository.findByCartId(cartId).stream()
                .sorted(Comparator.comparing(ProductItem::getId).reversed())
                .toList();
    }

    private void updateCartTotalPrice(Long cartId) {
        BigDecimal cartTotalPrice = cartItemRepository.findByCartId(cartId).stream()
                .map(CartItem::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        log.info(cartTotalPrice.toString());
        cartService.setCartTotalPrice(cartId, cartTotalPrice);
    }

    @Override
    public void updateItemQuantity(Long itemId, Integer quantity) throws ChangeSetPersister.NotFoundException {
        CartItem foundItem = cartItemRepository.findById(itemId).orElseThrow(ChangeSetPersister.NotFoundException::new);
        foundItem.setQuantity(quantity);
        foundItem.setTotalPrice(foundItem.getUnitPrice().multiply(new BigDecimal(quantity)));
        cartItemRepository.save(foundItem);
        updateCartTotalPrice(foundItem.getCart().getId());
    }

    @Override
    public void deleteCartItem(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    @Override
    public Long getAmountOfCartItems(Long cartId) {
        return cartItemRepository.countByCartId(cartId);
    }

    @Override
    @Transactional
    public void deleteAllItemsFromCart(Long cartId) {
        log.info("DELETING!");
        cartItemRepository.deleteAllByCartId(cartId);
    }
}

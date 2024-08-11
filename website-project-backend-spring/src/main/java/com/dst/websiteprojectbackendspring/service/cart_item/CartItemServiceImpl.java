package com.dst.websiteprojectbackendspring.service.cart_item;

import com.dst.websiteprojectbackendspring.model.cart.Cart;
import com.dst.websiteprojectbackendspring.model.cart_item.CartItem;
import com.dst.websiteprojectbackendspring.model.product.Product;
import com.dst.websiteprojectbackendspring.model.product_size.Size;
import com.dst.websiteprojectbackendspring.repository.CartItemRepository;
import com.dst.websiteprojectbackendspring.repository.ProductRepository;
import com.dst.websiteprojectbackendspring.service.cart.CartServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

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
        LocalDateTime now = LocalDateTime.now();
        cart.setLastUpdateDate(now);
        Product foundProduct = productRepository.findById(productId).orElseThrow(ChangeSetPersister.NotFoundException::new);

         if (!isItemCurrentlyInCart(foundProduct.getTitle(), size, quantity, cart.getId())) {
             CartItem cartItem = buildNewCartItem(quantity, size, foundProduct, now, cart);
             cartItemRepository.save(cartItem);
         }
    }

    private boolean isItemCurrentlyInCart(String productFullTitle, String size, Integer quantity, Long cartId) {
        List<CartItem> foundProductsWithTheSameTitle = getCartItemsWithTheSameTitle(productFullTitle, cartId);

        if (size != null) {
            foundProductsWithTheSameTitle = getCartItemsWithTheSameSize(size, foundProductsWithTheSameTitle);
        }

        if (!foundProductsWithTheSameTitle.isEmpty()) {
            foundProductsWithTheSameTitle
                    .forEach(foundProduct -> {
                        Integer newQuantity = quantity + foundProduct.getQuantity();
                        try {
                            updateItemQuantity(foundProduct.getId(), newQuantity);
                        } catch (ChangeSetPersister.NotFoundException e) {
                            throw new RuntimeException(e);
                        }
                    });

            return true;
        } else {
            return false;
        }
    }

    private List<CartItem> getCartItemsWithTheSameTitle(String productFullTitle, Long cartId) {
        return getCartItems(cartId).stream()
                .filter(item -> item.getProductFullTitle().equals(productFullTitle))
                .toList();
    }

    private List<CartItem> getCartItemsWithTheSameSize(String size, List<CartItem> foundProductsWithTheSameTitle) {
        return foundProductsWithTheSameTitle.stream()
                .filter(product -> product.getProductSize().equals(Size.valueOf(size)))
                .toList();
    }

    private static CartItem buildNewCartItem(Integer quantity, String size, Product foundProduct, LocalDateTime now, Cart cart) {
        CartItem cartItem = CartItem.builder()
                .productFullTitle(foundProduct.getName())
                .quantity(quantity)
                .mainImage(foundProduct.getImages().getFirst().getImage())
                .unitPrice(foundProduct.getPrice())
                .totalPrice(foundProduct.getPrice().multiply(new BigDecimal(quantity)))
                .dateAdded(now)
                .cart(cart)
                .build();

        if (size != null) {
            cartItem.setProductSize(Size.valueOf(size));
        }
        return cartItem;
    }

    @Override
    public List<CartItem> getCartItems(Long cartId) {
        return cartItemRepository.findByCartId(cartId).stream()
                .sorted(Comparator.comparing(CartItem::getDateAdded))
                .collect(Collectors.toList());
    }

    @Override
    public void updateItemQuantity(Long itemId, Integer quantity) throws ChangeSetPersister.NotFoundException {
        CartItem foundItem = cartItemRepository.findById(itemId).orElseThrow(ChangeSetPersister.NotFoundException::new);
        foundItem.setQuantity(quantity);
        foundItem.setTotalPrice(foundItem.getUnitPrice().multiply(new BigDecimal(quantity)));
        cartItemRepository.save(foundItem);
    }

    @Override
    public void deleteCartItem(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }
}

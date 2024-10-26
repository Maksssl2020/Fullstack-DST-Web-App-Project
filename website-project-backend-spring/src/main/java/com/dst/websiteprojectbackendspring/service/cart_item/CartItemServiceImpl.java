package com.dst.websiteprojectbackendspring.service.cart_item;

import com.dst.websiteprojectbackendspring.dto.product_item.ProductItemDTO;
import com.dst.websiteprojectbackendspring.mapper.ProductItemDTOMapper;
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
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class CartItemServiceImpl implements CartItemService {

    private final CartItemRepository cartItemRepository;
    private final CartServiceImpl cartService;
    private final ProductRepository productRepository;
    private final ProductItemDTOMapper productItemDTOMapper;

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
        List<ProductItemDTO> foundCartItemsWithTheSameMainProductId = getCartItemsWithTheSameMainProductId(mainProductId, cartId);

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

    private List<ProductItemDTO> getCartItemsWithTheSameMainProductId(Long mainProductId, Long cartId) {
        return getCartItemsByCartId(cartId).stream()
                .filter(item -> item.getMainProductId().equals(mainProductId))
                .toList();
    }

    private List<ProductItemDTO> getCartItemsWithTheSameSize(String size, List<ProductItemDTO> foundProductsWithTheSameTitle) {
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
    public List<ProductItemDTO> getCartItemsByCartId(Long cartId) {
        return cartItemRepository.findByCartId(cartId).stream()
                .sorted(Comparator.comparing(ProductItem::getId).reversed())
                .map(productItemDTOMapper::mapProductItemIntoProductItemDTO)
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
        log.info(String.valueOf(itemId));
        log.info(String.valueOf(quantity));
    }

    @Override
    public void deleteCartItem(Long cartItemId, Long cartId) {
        cartItemRepository.deleteById(cartItemId);
        updateCartTotalPrice(cartId);
    }

    @Override
    public Long getAmountOfCartItems(Long cartId) {
        return cartItemRepository.countByCartId(cartId);
    }

    @Override
    @Transactional
    public void deleteAllItemsFromCart(Long cartId) {
        cartItemRepository.deleteAllByCartId(cartId);
        updateCartTotalPrice(cartId);
    }

    @Override
    @Transactional
    public void deleteAllItemsWhichAreRelatedToDeletedShopProduct(Long deletedProductId) {
        log.info("Deleting related cart items!");
        Set<Long> cartsToUpdate = new HashSet<>();
        List<CartItem> allRelatedItems = cartItemRepository.getAllByMainProductId(deletedProductId);

        allRelatedItems.forEach(item -> {
            cartsToUpdate.add(item.getCart().getId());
            cartItemRepository.deleteById(item.getId());
        });
        cartsToUpdate.forEach(this::updateCartTotalPrice);
    }
}

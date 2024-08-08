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
        cart.setLastUpdateDate(LocalDateTime.now());

        Product foundProduct = productRepository.findById(productId).orElseThrow(ChangeSetPersister.NotFoundException::new);

        log.info(cart.toString());
        log.info(foundProduct.toString());
        CartItem cartItem = CartItem.builder()
                .productFullTitle(foundProduct.getName())
                .quantity(quantity)
                .mainImage(foundProduct.getImages().getFirst().getImage())
                .unitPrice(foundProduct.getPrice())
                .totalPrice(foundProduct.getPrice().multiply(new BigDecimal(quantity)))
                .cart(cart)
                .build();
        if (size != null) {
            cartItem.setProductSize(Size.valueOf(size));
        }

        cartItemRepository.save(cartItem);
    }

    @Override
    public List<CartItem> getCartItems(Long cartId) {
        return cartItemRepository.findByCartId(cartId);
    }

    @Override
    public void deleteCartItem(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }
}

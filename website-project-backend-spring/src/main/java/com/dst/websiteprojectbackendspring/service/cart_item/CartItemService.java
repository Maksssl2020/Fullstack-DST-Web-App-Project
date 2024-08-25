package com.dst.websiteprojectbackendspring.service.cart_item;

import com.dst.websiteprojectbackendspring.model.cart_item.CartItem;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CartItemService {

    void saveCartItem(Integer quantity, String size, Long productId, String cartIdentifier, boolean isUserRegistered) throws ChangeSetPersister.NotFoundException;
    List<CartItem> getCartItemsByCartId(Long cartId);
    void updateItemQuantity(Long itemId, Integer quantity) throws ChangeSetPersister.NotFoundException;
    void deleteCartItem(Long cartItemId);
    Long getAmountOfCartItems(Long cartId);
    void deleteAllItemsFromCart(Long cartId);
}

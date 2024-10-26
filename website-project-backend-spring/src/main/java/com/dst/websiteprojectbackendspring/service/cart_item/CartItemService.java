package com.dst.websiteprojectbackendspring.service.cart_item;

import com.dst.websiteprojectbackendspring.dto.cart_item.CartItemDTO;
import com.dst.websiteprojectbackendspring.dto.product_item.ProductItemDTO;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CartItemService {

    void saveCartItem(Integer quantity, String size, Long productId, String cartIdentifier, boolean isUserRegistered) throws ChangeSetPersister.NotFoundException;
    List<ProductItemDTO> getCartItemsByCartId(Long cartId);
    void updateItemQuantity(Long itemId, Integer quantity) throws ChangeSetPersister.NotFoundException;
    void deleteCartItem(Long cartItemId, Long cartId);
    Long getAmountOfCartItems(Long cartId);
    void deleteAllItemsFromCart(Long cartId);
    void deleteAllItemsWhichAreRelatedToDeletedShopProduct(Long deletedProductId);
}

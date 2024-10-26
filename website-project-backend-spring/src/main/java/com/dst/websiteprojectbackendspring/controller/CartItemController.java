package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.dto.product_item.ProductItemDTO;
import com.dst.websiteprojectbackendspring.service.cart_item.CartItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/items")
public class CartItemController {

    private final CartItemService cartItemService;

    @GetMapping("/cart/{cartId}")
    public ResponseEntity<List<ProductItemDTO>> getCartItems(@PathVariable Long cartId) {
        return ResponseEntity.ok(cartItemService.getCartItemsByCartId(cartId));
    }

    @GetMapping("/amount-of-items/{cartId}")
    public ResponseEntity<Long> getCartAmountOfItems(@PathVariable Long cartId) {
        return ResponseEntity.ok(cartItemService.getAmountOfCartItems(cartId));
    }

    @PostMapping("/add-item/{cartIdentifier}/{productId}")
    public ResponseEntity<HttpStatus> addItemToCart(
            @PathVariable String cartIdentifier,
            @PathVariable Long productId,
            @RequestParam("quantity") Integer quantity,
            @RequestParam(value = "size", required = false) String size,
            @RequestParam("userRegistered") boolean isUserRegistered
    ) throws ChangeSetPersister.NotFoundException {
        cartItemService.saveCartItem(quantity, size, productId, cartIdentifier, isUserRegistered);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/change-quantity/{cartItemId}")
    public ResponseEntity<HttpStatus> changeItemQuantity(
            @PathVariable Long cartItemId,
            @RequestParam("quantity") Integer quantity
    ) throws ChangeSetPersister.NotFoundException {
        cartItemService.updateItemQuantity(cartItemId, quantity);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/delete-item/{cartItemId}/{cartId}")
    public ResponseEntity<HttpStatus> deleteItemFromCart(@PathVariable Long cartItemId, @PathVariable Long cartId) {
        cartItemService.deleteCartItem(cartItemId, cartId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/delete-all-items/{cartId}")
    public ResponseEntity<HttpStatus> deleteAllItemsFromCart(@PathVariable Long cartId) {
        cartItemService.deleteAllItemsFromCart(cartId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

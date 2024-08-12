package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.model.cart_item.CartItem;
import com.dst.websiteprojectbackendspring.service.cart_item.CartItemServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/shop/carts/items")
public class CartItemController {

    private final CartItemServiceImpl cartItemService;

    @GetMapping("/{cartId}")
    public ResponseEntity<List<CartItem>> getCartItems(@PathVariable Long cartId) {
        return ResponseEntity.ok(cartItemService.getCartItems(cartId));
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

    @DeleteMapping("/delete-item/{cartItemId}")
    public ResponseEntity<HttpStatus> deleteItemFromCart(@PathVariable Long cartItemId) {
        cartItemService.deleteCartItem(cartItemId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/delete-all-items/{cartId}")
    public ResponseEntity<HttpStatus> deleteAllItemsFromCart(@PathVariable Long cartId) {
        cartItemService.deleteAllItemsFromCart(cartId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.model.cart.Cart;
import com.dst.websiteprojectbackendspring.service.cart.CartServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/shop/carts")
public class CartController {

    private final CartServiceImpl cartService;

    @GetMapping
    public ResponseEntity<List<Cart>> getAllCarts() {
        return ResponseEntity.ok(cartService.getAllCarts());
    }

    @GetMapping("/{cartIdentifier}/id")
    public ResponseEntity<Long> getCartId(@PathVariable String cartIdentifier) {
        return ResponseEntity.ok(cartService.getCartIdByIdentifier(cartIdentifier));
    }

    @GetMapping("/{cartIdentifier}")
    public ResponseEntity<Cart> getCartByIdentifier(@PathVariable String cartIdentifier, @RequestParam("userRegistered") boolean isUserRegistered) {
        return ResponseEntity.ok(cartService.getCartByIdentifier(cartIdentifier, isUserRegistered));
    }

    @GetMapping("/exist/{username}")
    public ResponseEntity<Boolean> isCartExist(@PathVariable String username) {
        return ResponseEntity.ok(cartService.existsByIdentifier(username));
    }
}

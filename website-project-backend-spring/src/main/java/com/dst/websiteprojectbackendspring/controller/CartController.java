package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.model.cart.Cart;
import com.dst.websiteprojectbackendspring.service.cart.CartServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/{username}")
    public ResponseEntity<Cart> getCartByUsername(@PathVariable String username) {
        return ResponseEntity.ok(cartService.getCartByCustomerUsername(username));
    }

    @GetMapping("/exist/{username}")
    public ResponseEntity<Boolean> isCartExist(@PathVariable String username) {
        return ResponseEntity.ok(cartService.existsByUsername(username));
    }
}

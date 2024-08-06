package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.model.cart.Cart;
import com.dst.websiteprojectbackendspring.service.cart.CartServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

    @PostMapping("/{username}")
    public ResponseEntity<Cart> createCart(@PathVariable String username) {
        return new ResponseEntity<>(cartService.getCart(username), HttpStatus.CREATED);
    }
}

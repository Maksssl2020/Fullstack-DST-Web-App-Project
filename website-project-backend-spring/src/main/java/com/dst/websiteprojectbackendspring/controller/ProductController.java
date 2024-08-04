package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.domain.product.Product;
import com.dst.websiteprojectbackendspring.dto.product.ProductDTOForCard;
import com.dst.websiteprojectbackendspring.service.product.ProductServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductServiceImpl<Product> productService;

    @GetMapping
    public ResponseEntity<List<Product>> getProducts() {
        return ResponseEntity.ok(productService.findAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) throws ChangeSetPersister.NotFoundException {
        return ResponseEntity.ok(productService.findProductById(id));
    }

    @GetMapping("/cards")
    public ResponseEntity<List<ProductDTOForCard>> getProductsByCard() {
        return ResponseEntity.ok(productService.findAllProductsDTOForCard());
    }
}

package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.dto.product.ProductDTO;
import com.dst.websiteprojectbackendspring.model.product.Product;
import com.dst.websiteprojectbackendspring.dto.product.ProductDTOForCard;
import com.dst.websiteprojectbackendspring.service.product.ProductServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductServiceImpl<Product> productService;

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getProducts() {
        return ResponseEntity.ok(productService.findAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) throws ChangeSetPersister.NotFoundException {
        return ResponseEntity.ok(productService.findProductById(id));
    }

    @GetMapping("/cards")
    public ResponseEntity<List<ProductDTOForCard>> findAllProductsForCards(@Param("category") String category) {
        return ResponseEntity.ok(productService.findAllProductsDTOForCard(category));
    }

    @GetMapping("/cards/{id}")
    public ResponseEntity<ProductDTOForCard> findProductForCardById(@PathVariable Long id) throws ChangeSetPersister.NotFoundException {
        return ResponseEntity.ok(productService.findProductDTOForCardById(id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteProductById(@PathVariable Long id) {
        productService.deleteProductById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

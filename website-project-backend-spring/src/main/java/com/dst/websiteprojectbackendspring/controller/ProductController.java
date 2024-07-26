package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.domain.product.Product;
import com.dst.websiteprojectbackendspring.service.product.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getProducts());
    }

    @PostMapping("/add-product")
    public ResponseEntity<HttpStatus> addProduct(
            @RequestParam("title") @Valid String title,
            @RequestParam("name") String name,
            @RequestParam("color") String color,
            @RequestParam("description") String description,
            @RequestParam("packageSize") String packageSize,
            @RequestParam("weight") String weight,
            @RequestParam("composition") String productComposition,
            @RequestParam("overprint") String productOverprint,
            @RequestParam("price") String price,
            @RequestParam("sizes") String[] sizes,
            @RequestParam("categories") String[] categories,
            @RequestParam("images") MultipartFile[] images
    ) {
        System.out.println(Arrays.toString(images));
        productService.saveProduct(title, name, color, description, packageSize, weight, productComposition, productOverprint, price, sizes, categories, images);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}

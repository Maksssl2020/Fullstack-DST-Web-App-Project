package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.dto.product_category.ProductCategoryDTO;
import com.dst.websiteprojectbackendspring.service.product_category.ProductCategoryServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/products/categories")
public class ProductCategoryController {

    private final ProductCategoryServiceImpl productCategoryService;

    @GetMapping
    public ResponseEntity<List<ProductCategoryDTO>> getAllProductCategories() {
        return ResponseEntity.ok(productCategoryService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<ProductCategoryDTO>> getProductCategories(@PathVariable Long id) {
        return ResponseEntity.ok(productCategoryService.findByProductId(id));
    }
}

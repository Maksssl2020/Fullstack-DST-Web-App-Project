package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.dto.product_image.ProductImageDTO;
import com.dst.websiteprojectbackendspring.service.product_image.ProductImageServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/products/images")
public class ProductImageController {

    private final ProductImageServiceImpl productImageService;

    @GetMapping("/{id}")
    public ResponseEntity<List<ProductImageDTO>> getProductImage(@PathVariable Long id) {
        return ResponseEntity.ok(productImageService.getProductImages(id));
    }
}

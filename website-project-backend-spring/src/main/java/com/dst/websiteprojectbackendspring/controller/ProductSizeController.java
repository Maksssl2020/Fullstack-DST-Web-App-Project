package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.dto.product_size.ProductSizeDTO;
import com.dst.websiteprojectbackendspring.service.product_size.ProductSizeServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/products/sizes")
public class ProductSizeController {

    private final ProductSizeServiceImpl productSizeService;

    @GetMapping("/{id}")
    public ResponseEntity<List<ProductSizeDTO>> getProductSizes(@PathVariable Long id) {
        return ResponseEntity.ok(productSizeService.findProductSizesByProductId(id));
    }
}

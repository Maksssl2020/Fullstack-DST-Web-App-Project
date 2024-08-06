package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.model.product.clothing.Clothing;
import com.dst.websiteprojectbackendspring.service.product.clothing.ClothingServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/products/clothes")
public class ClothingController {

    private final ClothingServiceImpl clothingService;

    @GetMapping
    public ResponseEntity<List<Clothing>> findAllClothes() {
        return ResponseEntity.ok(clothingService.findAllClothes());
    }

    @PostMapping("/add-clothing")
    public ResponseEntity<HttpStatus> addClothing(
            @RequestParam("title") String title,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("packageSize") String packageSize,
            @RequestParam("weight") String weight,
            @RequestParam("price") String price,
            @RequestParam("categories") List<String> categories,
            @RequestParam(value = "images", required = false) MultipartFile[] images,
            @RequestParam("color") String color,
            @RequestParam("productComposition") String productComposition,
            @RequestParam("productOverprint") String productOverprint,
            @RequestParam("productsSizes") List<String> productsSizes
    ) {
        clothingService.saveClothing(
                title, name, description,
                packageSize, weight, price, categories,
                images, color, productComposition, productOverprint,
                productsSizes
        );
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}

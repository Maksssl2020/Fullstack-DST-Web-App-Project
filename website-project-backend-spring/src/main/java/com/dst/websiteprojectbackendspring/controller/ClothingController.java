package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.dto.product.clothing.ClothingRequest;
import com.dst.websiteprojectbackendspring.model.product.clothing.Clothing;
import com.dst.websiteprojectbackendspring.service.product.clothing.ClothingServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/add")
    public ResponseEntity<HttpStatus> addClothing(@ModelAttribute ClothingRequest clothingRequest) {
        clothingService.saveClothing(clothingRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<HttpStatus> updateClothing(@PathVariable Long id, @ModelAttribute ClothingRequest clothingRequest) {
        clothingService.updateClothing(id, clothingRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

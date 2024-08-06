package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.model.product.mug.Mug;
import com.dst.websiteprojectbackendspring.service.product.mug.MugServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/products/mugs")
public class MugController {

    private final MugServiceImpl mugService;

    @GetMapping
    public ResponseEntity<List<Mug>> findAllClothes() {
        return ResponseEntity.ok(mugService.findAllMugs());
    }

    @PostMapping("/add-mug")
    public ResponseEntity<HttpStatus> addMug(
            @RequestParam("title") String title,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("packageSize") String packageSize,
            @RequestParam("weight") String weight,
            @RequestParam("price") String price,
            @RequestParam("categories") List<String> categories,
            @RequestParam(value = "images", required = false) MultipartFile[] images,
            @RequestParam("color") String color,
            @RequestParam("height") String height,
            @RequestParam("material") String material
    ) {
        mugService.saveMug(
                title, name, description,
                packageSize, weight, price, categories,
                images, color, height, material
        );
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}

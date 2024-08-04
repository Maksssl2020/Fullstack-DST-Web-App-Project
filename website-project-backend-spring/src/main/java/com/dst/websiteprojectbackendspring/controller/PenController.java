package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.domain.product.pen.Pen;
import com.dst.websiteprojectbackendspring.service.product.pen.PenServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/products/pens")
public class PenController {

    private final PenServiceImpl penService;

    @GetMapping
    public ResponseEntity<List<Pen>> findAllClothes() {
        return ResponseEntity.ok(penService.findAllPens());
    }

    @PostMapping("/add-pen")
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
            @RequestParam("inkColor") String inkColor
    ) {
        penService.savePen(
                title, name, description,
                packageSize, weight, price, categories,
                images, color, inkColor
        );
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}

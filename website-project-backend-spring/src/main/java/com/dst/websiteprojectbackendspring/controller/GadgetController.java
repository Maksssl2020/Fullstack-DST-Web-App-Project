package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.domain.product.gadget.Gadget;
import com.dst.websiteprojectbackendspring.service.product.gadget.GadgetServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/products/gadgets")
public class GadgetController {

    private final GadgetServiceImpl gadgetService;

    @GetMapping
    public ResponseEntity<List<Gadget>> findAllClothes() {
        return ResponseEntity.ok(gadgetService.findAllGadgets());
    }

    @PostMapping("/add-gadget")
    public ResponseEntity<HttpStatus> addClothing(
            @RequestParam("title") String title,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("packageSize") String packageSize,
            @RequestParam("weight") String weight,
            @RequestParam("price") String price,
            @RequestParam("categories") List<String> categories,
            @RequestParam(value = "images", required = false) MultipartFile[] images,
            @RequestParam("type") String type,
            @RequestParam("material") String material
    ) {
        gadgetService.saveGadget(
                title, name, description,
                packageSize, weight, price, categories,
                images, type, material
        );
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}

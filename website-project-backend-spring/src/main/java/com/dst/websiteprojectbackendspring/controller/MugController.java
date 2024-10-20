package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.dto.product.mug.MugRequest;
import com.dst.websiteprojectbackendspring.model.product.mug.Mug;
import com.dst.websiteprojectbackendspring.service.product.mug.MugServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/add")
    public ResponseEntity<HttpStatus> addMug(@ModelAttribute MugRequest mugRequest) {
        mugService.saveMug(mugRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<HttpStatus> updateMug(@PathVariable Long id, @ModelAttribute MugRequest mugRequest) {
        mugService.updateMug(id, mugRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

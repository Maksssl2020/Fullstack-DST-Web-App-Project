package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.dto.product.pen.PenRequest;
import com.dst.websiteprojectbackendspring.model.product.pen.Pen;
import com.dst.websiteprojectbackendspring.service.product.pen.PenServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/add")
    public ResponseEntity<HttpStatus> addClothing(@ModelAttribute PenRequest penRequest) {
        penService.savePen(penRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<HttpStatus> updatePen(@PathVariable Long id, @ModelAttribute PenRequest penRequest) {
        penService.updatePen(id, penRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

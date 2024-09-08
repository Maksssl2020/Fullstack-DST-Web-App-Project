package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.dto.product.clothing.GadgetRequest;
import com.dst.websiteprojectbackendspring.model.product.gadget.Gadget;
import com.dst.websiteprojectbackendspring.service.product.gadget.GadgetServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/add")
    public ResponseEntity<HttpStatus> addClothing(@ModelAttribute GadgetRequest gadgetRequest) {
        gadgetService.saveGadget(gadgetRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<HttpStatus> updateGadget(@PathVariable Long id, @ModelAttribute GadgetRequest gadgetRequest) {
        gadgetService.updateGadget(id, gadgetRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.dto.discount_code.DiscountCodeDTO;
import com.dst.websiteprojectbackendspring.model.discount_code.DiscountCodeRequest;
import com.dst.websiteprojectbackendspring.service.discount_code.DiscountCodeServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/shop/discount-codes")
public class DiscountCodeController {

    private final DiscountCodeServiceImpl discountCodeService;

    @GetMapping
    public ResponseEntity<List<DiscountCodeDTO>> getAllDiscountCodes() {
        return ResponseEntity.ok(discountCodeService.getDiscountCodes());
    }

    @GetMapping("/{discountCode}")
    public ResponseEntity<DiscountCodeDTO> getDiscountCode(@PathVariable String discountCode) throws ChangeSetPersister.NotFoundException {
        return ResponseEntity.ok(discountCodeService.getDiscountCodeDTO(discountCode));
    }

    @GetMapping("/{discountCode}/is-still-valid")
    public ResponseEntity<Boolean> isDiscountCodeStillValid(@PathVariable String discountCode) throws ChangeSetPersister.NotFoundException {
        return new ResponseEntity<>(discountCodeService.isDiscountCodeValid(discountCode), HttpStatus.OK);
    }

    @GetMapping("/{discountCode}/apply-non-global-discount")
    public ResponseEntity<BigDecimal> applyNonGlobalDiscount(@PathVariable String discountCode) throws ChangeSetPersister.NotFoundException {
        return ResponseEntity.ok(discountCodeService.applyNonGlobalDiscount(discountCode));
    }

    @GetMapping("/{discountCode}/{userId}/apply-global-discount")
    public ResponseEntity<BigDecimal> applyGlobalDiscount(@PathVariable String discountCode, @PathVariable Long userId) throws ChangeSetPersister.NotFoundException {
        return ResponseEntity.ok(discountCodeService.applyGlobalDiscount(discountCode, userId));
    }

    @GetMapping("/generate-discount-code")
    public ResponseEntity<String> generateDiscountCode() {
        return ResponseEntity.ok(discountCodeService.generateDiscountCode());
    }

    @GetMapping("/is-entered-code-unique")
    public ResponseEntity<Boolean> isEnteredCodeUnique(@RequestParam("code") String code) {
        return ResponseEntity.ok(discountCodeService.isDiscountCodeUnique(code));
    }

    @PostMapping("/add-discount-code")
    public ResponseEntity<HttpStatus> addDiscountCode(@RequestBody DiscountCodeRequest discountCode) {
        discountCodeService.saveDiscountCode(discountCode);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{discountId}/delete")
    public ResponseEntity<HttpStatus> deleteDiscountCode(@PathVariable Long discountId) {
        discountCodeService.deleteDiscountCode(discountId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.model.discount_code.DiscountCode;
import com.dst.websiteprojectbackendspring.model.discount_code.DiscountCodeRequest;
import com.dst.websiteprojectbackendspring.service.discount_code.DiscountCodeServiceImpl;
import lombok.RequiredArgsConstructor;
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
    public ResponseEntity<List<DiscountCode>> getAllDiscountCodes() {
        return ResponseEntity.ok(discountCodeService.getDiscountCodes());
    }

    @GetMapping("/{discountCode}")
    public ResponseEntity<DiscountCode> getDiscountCode(@PathVariable String discountCode) {
        return ResponseEntity.ok(discountCodeService.getDiscountCode(discountCode));
    }

    @GetMapping("/{discountCode}/apply-non-global-discount")
    public ResponseEntity<BigDecimal> applyNonGlobalDiscount(@PathVariable String discountCode) {
        return ResponseEntity.ok(discountCodeService.applyNonGlobalDiscount(discountCode));
    }

    @GetMapping("/{discountCode}/{userId}/apply-global-discount")
    public ResponseEntity<BigDecimal> applyGlobalDiscount(@PathVariable String discountCode, @PathVariable Long userId) {
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

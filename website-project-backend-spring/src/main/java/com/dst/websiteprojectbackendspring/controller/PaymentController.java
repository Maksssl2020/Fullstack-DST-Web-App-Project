package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.model.payment.PaymentRequest;
import com.dst.websiteprojectbackendspring.service.payment.PaymentServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
@CrossOrigin
public class PaymentController {

    private final PaymentServiceImpl paymentService;

    @PostMapping("/payment")
    public String createPayment(@RequestBody PaymentRequest paymentRequest) {
        return paymentService.processTPayPayment(paymentRequest);
    }
}

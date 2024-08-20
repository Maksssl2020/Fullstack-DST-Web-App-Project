package com.dst.websiteprojectbackendspring.service.payment;

import com.dst.websiteprojectbackendspring.model.payment.PaymentRequest;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

@Service
public interface PaymentService {

    String processTPayPayment(PaymentRequest paymentRequest);
    String getTPayNotification(HttpServletRequest request);
}

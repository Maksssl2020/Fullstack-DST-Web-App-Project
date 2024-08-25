package com.dst.websiteprojectbackendspring.service.payment;

import com.dst.websiteprojectbackendspring.model.payment.Payment;
import com.dst.websiteprojectbackendspring.model.payment.PaymentRequest;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

@Service
public interface PaymentService {

    void fetchTPayAccessToken();
    String processTPayPayment(PaymentRequest paymentRequest);
    Payment getYPaySpecifiedTransaction(String transactionId);
    String getTPayNotification(HttpServletRequest request);
}

package com.dst.websiteprojectbackendspring.service.payment;

import com.dst.websiteprojectbackendspring.model.payment.Payment;
import com.dst.websiteprojectbackendspring.model.payment.PaymentRequest;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public interface PaymentService {

    List<Payment> findAllPayments();
    void fetchTPayAccessToken();
    String processTPayPayment(PaymentRequest paymentRequest);
    Mono<Payment> getTPaySpecifiedTransaction(String transactionId);
    String getTPayNotification(HttpServletRequest request);
}

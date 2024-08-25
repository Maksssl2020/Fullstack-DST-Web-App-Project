package com.dst.websiteprojectbackendspring.service.payment;

import com.dst.websiteprojectbackendspring.model.order.Order;
import com.dst.websiteprojectbackendspring.model.payment.Payment;
import com.dst.websiteprojectbackendspring.model.payment.PaymentRequest;
import com.dst.websiteprojectbackendspring.model.payment.PaymentStatus;
import com.dst.websiteprojectbackendspring.repository.OrderRepository;
import com.dst.websiteprojectbackendspring.repository.PaymentRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final WebClient webClient;
    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    @Value("${tpay.client-id}")
    private String clientId;

    @Value("${tpay.client-secret}")
    private String clientSecret;

    private String accessToken;
    private LocalDateTime tokenExpiresDate;


    @Override
    public void fetchTPayAccessToken() {
        Map<String, Object> authorizationData = new HashMap<>();
        authorizationData.put("client_id", clientId);
        authorizationData.put("client_secret", clientSecret);

        Mono<Map<String, Object>> response = webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .scheme("https")
                        .host("openapi.sandbox.tpay.com")
                        .path("/oauth/auth")
                        .build())
                .body(BodyInserters.fromValue(authorizationData))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<>() {
                });

        Map<String, Object> responseBody = response.block();

        if (responseBody != null) {
            String expiresIn = responseBody.get("expires_in").toString();
            String responseAccessToken = responseBody.get("access_token").toString();

            tokenExpiresDate = LocalDateTime.now().plusSeconds(Long.parseLong(expiresIn));
            accessToken = responseAccessToken;
        }
    }

    @Override
    public String processTPayPayment(PaymentRequest paymentRequest) {
        log.info("PROCESSING PAYMENT !!!!!!!!!!!!");

        if (isAccessTokenExpired()) {
            fetchTPayAccessToken();
        }

        try {
            Order order = orderRepository.findById(paymentRequest.orderId())
                    .orElseThrow(ChangeSetPersister.NotFoundException::new);

            Map<String, Object> paymentData = preparePaymentData(paymentRequest);
            String redirectUrl = initiatePayment(paymentData, order);

            log.info(redirectUrl);

            return redirectUrl;

        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    private Map<String, Object> preparePaymentData(PaymentRequest paymentRequest) {
        Map<String, Object> paymentData = new HashMap<>();
        paymentData.put("amount", new BigDecimal(paymentRequest.amount()));
        paymentData.put("description", paymentRequest.paymentDescription());

        Map<String, Object> payerData = new HashMap<>();
        payerData.put("email", paymentRequest.email());
        payerData.put("name", paymentRequest.firstName() + " " + paymentRequest.lastName());

        paymentData.put("payer", payerData);

        Map<String, Object> callbacks = new HashMap<>();
        Map<String, Object> payerUrls = new HashMap<>();
        payerUrls.put("success", "http://localhost:3000/payment-success");
        payerUrls.put("error", "https://test.tpay.com/payment_error");

        callbacks.put("payerUrls", payerUrls);
        callbacks.put("notification", Map.of(
                "url", "https://test.tpay.com",
                "email", "test@tpay.com"
        ));

        paymentData.put("callbacks", callbacks);

        return paymentData;
    }

    private String initiatePayment(Map<String, Object> paymentData, Order order) {
        Mono<Map<String, Object>> response = webClient.post()
                .uri("https://openapi.sandbox.tpay.com/transactions")
                .header("Authorization", "Bearer " + accessToken)
                .body(BodyInserters.fromValue(paymentData))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<>() {});

        Map<String, Object> responseBody = response.block();

        log.info(responseBody.toString());

        String redirectUrl = responseBody.get("transactionPaymentUrl").toString();
        String transactionId = responseBody.get("transactionId").toString();
        BigDecimal amount = new BigDecimal(responseBody.get("amount").toString());

        Payment payment = Payment.builder()
                .transactionId(transactionId)
                .amount(amount)
                .status(PaymentStatus.PENDING)
                .build();

        paymentRepository.save(payment);

        order.setPayment(payment);
        orderRepository.save(order);

        log.info(redirectUrl);

        return redirectUrl;
    }


    @Override
    public Payment getYPaySpecifiedTransaction(String transactionId) {
        Payment foundPayment = paymentRepository.findByTransactionId(transactionId);

        if (isAccessTokenExpired()) {
            log.info("Access token expired, fetching a new one.");
            fetchTPayAccessToken();
        }

        Mono<Map<String, Object>> paymentData = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .scheme("https")
                        .host("openapi.sandbox.tpay.com")
                        .path(String.format("/transactions/%s", transactionId))
                        .build())
                .header("Authorization", "Bearer " + accessToken)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<>() {
                });

        Map<String, Object> payment = paymentData.block();

        if (payment != null) {
            foundPayment.setResult(payment.get("result").toString());
            foundPayment.setStatus(PaymentStatus.valueOf(payment.get("status").toString().toUpperCase()));
            paymentRepository.save(foundPayment);
        }

        return foundPayment;
    }

    private boolean isAccessTokenExpired() {
        return accessToken == null || tokenExpiresDate.isBefore(LocalDateTime.now());
    }

    @Override
    public String getTPayNotification(HttpServletRequest request) {
        return "";
    }
}

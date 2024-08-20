package com.dst.websiteprojectbackendspring.service.payment;

import com.dst.websiteprojectbackendspring.model.payment.PaymentRequest;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final WebClient webClient;

    @Value("${tpay.client-id}")
    private String clientId;

    @Value("${tpay.client-secret}")
    private String clientSecret;

    @Value("${tpay.access-token}")
    private String accessToken;


    @Override
    public String processTPayPayment(PaymentRequest paymentRequest) {
        Map<String, Object> paymentData = new HashMap<>();
        paymentData.put("amount", new BigDecimal(paymentRequest.amount()));
        paymentData.put("description", paymentRequest.paymentDescription());

        Map<String, Object> payerData = new HashMap<>();
        payerData.put("email", paymentRequest.email());
        payerData.put("name", String.format("%s %s", paymentRequest.firstName(), paymentRequest.lastName()));
//        payerData.put("phone", paymentRequest.phoneNumber());
//        payerData.put("address", String.format("%s %s", paymentRequest.street(), paymentRequest.streetNumber()));
//        payerData.put("city", paymentRequest.city());
//        payerData.put("postalCode", paymentRequest.postalCode());
        paymentData.put("payer", payerData);

        Map<String, Object> callbacks = new HashMap<>();
        Map<String, Object> payerUrls = new HashMap<>();

        payerUrls.put("success", "https://test.tpay.com/payment_success");
        payerUrls.put("error", "https://test.tpay.com/payment_error");
        callbacks.put("payerUrls", payerUrls);
        callbacks.put("notification", Map.of(
                "url", "https://test.tpay.com",
                "email", "test@tpay.com"
        ));

        paymentData.put("callbacks", callbacks);

        String auth = clientId + ":" + clientSecret;
        String encodedAuth = Base64.getEncoder().encodeToString(auth.getBytes(StandardCharsets.UTF_8));
        String authHeader = "Basic " + encodedAuth;

        Mono<Map<String, Object>> response = webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .scheme("https")
                        .host("openapi.sandbox.tpay.com")
                        .path("/transactions")
                        .build())
                .header("Authorization", "Bearer " + accessToken)
                .body(BodyInserters.fromValue(paymentData))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<>() {
                });

        Map<String, Object> responseBody = response.block();
        String redirectUrl = (String) responseBody.get("transactionPaymentUrl");
        log.info(redirectUrl);

        return redirectUrl;
    }

    @Override
    public String getTPayNotification(HttpServletRequest request) {
        return "";
    }
}

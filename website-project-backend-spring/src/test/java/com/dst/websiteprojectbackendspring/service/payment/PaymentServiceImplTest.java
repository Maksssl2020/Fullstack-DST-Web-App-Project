package com.dst.websiteprojectbackendspring.service.payment;

import com.dst.websiteprojectbackendspring.model.payment.PaymentRequest;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.reactive.function.client.WebClient;

@RequiredArgsConstructor
@ExtendWith(MockitoExtension.class)
class PaymentServiceImplTest {

    @InjectMocks
    private PaymentServiceImpl paymentService;

    @Mock
    private WebClient webClient;

    @Mock
    private WebClient.RequestHeadersUriSpec requestHeadersUriSpec;

    @Mock
    private WebClient.RequestBodySpec requestBodySpec;

    @Mock
    private WebClient.RequestHeadersSpec requestHeadersSpec;

    @Mock
    private WebClient.ResponseSpec responseSpec;

    private PaymentRequest paymentRequest;

    @BeforeEach
    void setUp() {
        paymentRequest = new PaymentRequest(
                "105.5",
                "Test Paymen From Spring Boot",
                "Mark",
                "Kowalski",
                "Wroniecka",
                "Warszawa",
                "10",
                "64-500",
                "123456789",
                "maksymilian.leszczynski@o2.pl"
        );
    }
}
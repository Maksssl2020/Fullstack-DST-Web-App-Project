package com.dst.websiteprojectbackendspring.service.payment;

import com.dst.websiteprojectbackendspring.model.payment.PaymentRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.reactive.function.client.WebClient;

@ExtendWith(MockitoExtension.class)
class PaymentServiceImplTest {

    @Mock
    private WebClient webClient;

    @InjectMocks
    private PaymentServiceImpl paymentService;

    private PaymentRequest paymentRequest;

    @BeforeEach
    void setUp() {
        paymentRequest = new PaymentRequest(
                1L,
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

    @Test
    void name() {
        paymentService.fetchTPayAccessToken();
    }
}
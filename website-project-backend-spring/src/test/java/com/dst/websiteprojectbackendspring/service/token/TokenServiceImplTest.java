package com.dst.websiteprojectbackendspring.service.token;

import com.dst.websiteprojectbackendspring.model.token.TokenType;
import org.junit.jupiter.api.Test;

import java.time.Duration;
import java.time.LocalDateTime;

class TokenServiceImplTest {


    @Test
    void test() {
        Duration duration = Duration.ofMillis(42300000);
        LocalDateTime plus = LocalDateTime.now().plus(duration);
        System.out.println(plus);
        System.out.println(TokenType.RESET_PASSWORD == TokenType.RESET_PASSWORD);
    }
}
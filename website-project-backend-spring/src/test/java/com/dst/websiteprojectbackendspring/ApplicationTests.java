package com.dst.websiteprojectbackendspring;

import com.dst.websiteprojectbackendspring.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@RequiredArgsConstructor
class ApplicationTests {

    @Test
    void contextLoads() {
        Double d = Double.valueOf("123.456");
        System.out.println(d);
    }

}

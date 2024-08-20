package com.dst.websiteprojectbackendspring.helpers;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class RandomTextCodeGeneratorTest {

    @Test
    void shouldGenerateCode() {
        String generateCode = RandomTextCodeGenerator.generateCode(11);
        assertNotNull(generateCode);
        assertThat(generateCode.length()).isEqualTo(11);
    }
}
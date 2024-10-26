package com.dst.websiteprojectbackendspring.dto.payment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PaymentDTO {

    private Long id;
    private String transactionId;
    private BigDecimal amount;
    private String result;
    private String status;
}

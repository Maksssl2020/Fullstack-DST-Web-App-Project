package com.dst.websiteprojectbackendspring.mapper;

import com.dst.websiteprojectbackendspring.dto.payment.PaymentDTO;
import com.dst.websiteprojectbackendspring.model.payment.Payment;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PaymentDTOMapper {

    private final ModelMapper modelMapper;

    public PaymentDTO mapPaymentIntoPaymentDTO(Payment payment) {
        return modelMapper.map(payment, PaymentDTO.class);
    }
}

package com.dst.websiteprojectbackendspring.mapper;

import com.dst.websiteprojectbackendspring.dto.discount_code.DiscountCodeDTO;
import com.dst.websiteprojectbackendspring.model.discount_code.DiscountCode;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DiscountCodeDTOMapper {

    private final ModelMapper modelMapper;

    public DiscountCodeDTO mapDiscountCodeToDiscountCodeDTO(DiscountCode discountCode) {
        return modelMapper.map(discountCode, DiscountCodeDTO.class);
    }
}

package com.dst.websiteprojectbackendspring.mapper;

import com.dst.websiteprojectbackendspring.dto.order.OrderDTO;
import com.dst.websiteprojectbackendspring.model.order.Order;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OrderDTOMapper {

    private final ModelMapper modelMapper;

    public OrderDTO mapOrderIntoOrderDTO(Order order) {
        return modelMapper.map(order, OrderDTO.class);
    }
}

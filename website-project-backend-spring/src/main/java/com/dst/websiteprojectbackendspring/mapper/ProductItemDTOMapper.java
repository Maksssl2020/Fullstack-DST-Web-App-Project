package com.dst.websiteprojectbackendspring.mapper;

import com.dst.websiteprojectbackendspring.dto.cart_item.CartItemDTO;
import com.dst.websiteprojectbackendspring.dto.order_item.OrderItemDTO;
import com.dst.websiteprojectbackendspring.dto.product_item.ProductItemDTO;
import com.dst.websiteprojectbackendspring.model.cart_item.CartItem;
import com.dst.websiteprojectbackendspring.model.order_item.OrderItem;
import com.dst.websiteprojectbackendspring.model.product_item.ProductItem;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProductItemDTOMapper {

    private final ModelMapper modelMapper;

    public ProductItemDTO mapProductItemIntoProductItemDTO(ProductItem productItem) {
        return switch (productItem) {
            case CartItem cartItem -> modelMapper.map(productItem, CartItemDTO.class);
            case OrderItem orderItem -> modelMapper.map(productItem, OrderItemDTO.class);
            default -> modelMapper.map(productItem, ProductItemDTO.class);
        };
    }
}

package com.dst.websiteprojectbackendspring.mapper;

import com.dst.websiteprojectbackendspring.dto.cart_item.CartItemDTO;
import com.dst.websiteprojectbackendspring.model.cart_item.CartItem;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CartItemDTOMapper {

    private final ModelMapper modelMapper;

    public CartItemDTO mapCartItemToCartItemDTO(CartItem cartItem) {
        return modelMapper.map(cartItem, CartItemDTO.class);
    }
}

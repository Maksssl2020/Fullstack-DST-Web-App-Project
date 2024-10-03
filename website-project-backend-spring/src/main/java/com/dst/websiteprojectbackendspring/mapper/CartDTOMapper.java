package com.dst.websiteprojectbackendspring.mapper;

import com.dst.websiteprojectbackendspring.dto.cart.CartDTO;
import com.dst.websiteprojectbackendspring.model.cart.Cart;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class CartDTOMapper {

    private final ModelMapper modelMapper;

    public CartDTO mapCartToCartDTO(Cart cart) {
        return modelMapper.map(cart, CartDTO.class);
    }
}

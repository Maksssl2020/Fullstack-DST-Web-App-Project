package com.dst.websiteprojectbackendspring.service.cart_item;

import com.dst.websiteprojectbackendspring.dto.cart_item.CartItemDTO;
import com.dst.websiteprojectbackendspring.mapper.CartItemDTOMapper;
import com.dst.websiteprojectbackendspring.model.cart.Cart;
import com.dst.websiteprojectbackendspring.model.cart_item.CartItem;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@Slf4j
@ExtendWith(MockitoExtension.class)
class CartItemServiceImplTest {


    @Mock
    CartItemDTOMapper cartItemDTOMapper;

    @InjectMocks
    CartItemServiceImpl cartItemService;

    private CartItem testCartItem;
    private CartItemDTO testCartItemDTO;
    private Cart testCart;

    @BeforeEach
    void setUp() {

        CartItem.CartItemBuilder<?, ?> cartItem = CartItem.builder()
                .cart(testCart)
                .dateAdded(LocalDateTime.now())
                .totalPrice(new BigDecimal("123.99"))
                .unitPrice(new BigDecimal("20.99"))
                .quantity(6)
                .productFullTitle("Test");

        testCartItem = cartItem.build();

        testCart = Cart.builder()
                .id(-1L)
                .creationDate(LocalDateTime.now())
                .totalPrice(testCartItem.getTotalPrice())
                .userRegistered(true)
                .build();

        testCartItemDTO = new CartItemDTO();
        testCartItemDTO.setDateAdded(testCartItem.getDateAdded());
        testCartItemDTO.setTotalPrice(testCartItem.getTotalPrice());
        testCartItemDTO.setUnitPrice(testCartItem.getUnitPrice());
        testCartItemDTO.setQuantity(testCartItem.getQuantity());
        testCartItemDTO.setProductFullTitle(testCartItem.getProductFullTitle());
        testCartItemDTO.setCartId(testCart.getId());
    }

    @AfterEach
    void tearDown() {
        Mockito.reset(cartItemDTOMapper);
    }

    @Test
    void testMapCartItemToCartItemDTO() {
        when(cartItemDTOMapper.mapCartItemToCartItemDTO(testCartItem)).thenReturn(testCartItemDTO);
        CartItemDTO result = cartItemDTOMapper.mapCartItemToCartItemDTO(testCartItem);


        assertEquals(testCartItemDTO.getDateAdded(), result.getDateAdded());
        assertEquals(testCartItemDTO.getTotalPrice(), result.getTotalPrice());
        assertEquals(testCartItemDTO.getUnitPrice(), result.getUnitPrice());
        assertEquals(testCartItemDTO.getQuantity(), result.getQuantity());
        assertEquals(testCartItemDTO.getProductFullTitle(), result.getProductFullTitle());
        assertEquals(testCartItemDTO.getCartId(), result.getCartId());
    }
}
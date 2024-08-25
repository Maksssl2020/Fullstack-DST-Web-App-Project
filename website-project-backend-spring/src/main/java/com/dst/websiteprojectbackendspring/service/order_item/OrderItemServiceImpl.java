package com.dst.websiteprojectbackendspring.service.order_item;

import com.dst.websiteprojectbackendspring.model.cart_item.CartItem;
import com.dst.websiteprojectbackendspring.model.order.Order;
import com.dst.websiteprojectbackendspring.model.order_item.OrderItem;
import com.dst.websiteprojectbackendspring.repository.CartItemRepository;
import com.dst.websiteprojectbackendspring.repository.OrderItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderItemServiceImpl implements OrderItemService {

    private final CartItemRepository cartItemRepository;
    private final OrderItemRepository orderItemRepository;

    @Override
    public void saveOrderItem(OrderItem orderItem) {
        orderItemRepository.save(orderItem);
    }

    @Override
    public void saveOrderItemsFromCart(Long cartId, Order order) {
        List<CartItem> foundCartItems = cartItemRepository.findByCartId(cartId);
        List<OrderItem> orderItems = foundCartItems.stream()
                .map(cartItem -> {
                    OrderItem orderItem = OrderItem.builder()
                            .order(order)
                            .dateAdded(LocalDateTime.now())
                            .quantity(cartItem.getQuantity())
                            .mainProductId(cartItem.getMainProductId())
                            .mainImage(cartItem.getMainImage())
                            .productFullTitle(cartItem.getProductFullTitle())
                            .unitPrice(cartItem.getUnitPrice())
                            .totalPrice(cartItem.getTotalPrice())
                            .productSize(cartItem.getProductSize())
                            .build();

                    return orderItem;
                })
                .toList();

        orderItemRepository.saveAll(orderItems);
    }
}

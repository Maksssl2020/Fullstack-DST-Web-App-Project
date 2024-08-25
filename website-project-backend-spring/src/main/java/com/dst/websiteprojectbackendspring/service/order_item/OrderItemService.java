package com.dst.websiteprojectbackendspring.service.order_item;

import com.dst.websiteprojectbackendspring.model.order.Order;
import com.dst.websiteprojectbackendspring.model.order_item.OrderItem;
import org.springframework.stereotype.Service;

@Service
public interface OrderItemService {

    void saveOrderItem(OrderItem orderItem);
    void saveOrderItemsFromCart(Long cartId, Order order);
}

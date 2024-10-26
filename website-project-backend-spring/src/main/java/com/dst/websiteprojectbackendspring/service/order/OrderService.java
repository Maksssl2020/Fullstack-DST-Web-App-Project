package com.dst.websiteprojectbackendspring.service.order;

import com.dst.websiteprojectbackendspring.dto.order.OrderDTO;
import com.dst.websiteprojectbackendspring.dto.order.OrderRequestDTO;
import com.dst.websiteprojectbackendspring.model.order.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderService {

    void saveOrder(Order order);
    Long saveOrder(OrderRequestDTO orderRequestDTO);
    OrderDTO findOrderById(Long id);
    Page<OrderDTO> findAllOrders(PageRequest pageRequest);
    List<OrderDTO> findOrdersByAuthenticatedCustomerId(Long userId);
    void updateOrder(Long orderId, String orderStatus);
    void deleteOrder(Long id);
}

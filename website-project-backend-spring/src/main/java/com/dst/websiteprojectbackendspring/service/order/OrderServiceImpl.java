package com.dst.websiteprojectbackendspring.service.order;

import com.dst.websiteprojectbackendspring.dto.order.OrderRequestDTO;
import com.dst.websiteprojectbackendspring.model.order.Order;
import com.dst.websiteprojectbackendspring.model.order.OrderStatus;
import com.dst.websiteprojectbackendspring.model.payment.Payment;
import com.dst.websiteprojectbackendspring.repository.OrderRepository;
import com.dst.websiteprojectbackendspring.service.biling.BillingServiceImpl;
import com.dst.websiteprojectbackendspring.service.order_item.OrderItemServiceImpl;
import com.dst.websiteprojectbackendspring.service.payment.PaymentServiceImpl;
import com.dst.websiteprojectbackendspring.service.shipping.ShippingServiceImpl;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final PaymentServiceImpl paymentService;
    private final BillingServiceImpl billingService;
    private final ShippingServiceImpl shippingService;
    private final OrderItemServiceImpl orderItemService;

    @Override
    public void saveOrder(Order order) {
        orderRepository.save(order);
    }

    @Override
    @Transactional
    public Long saveOrder(OrderRequestDTO orderRequestDTO) {
        log.info("SAVING ORDER!");
        Order order = new Order();
        billingService.saveBilling(orderRequestDTO.billing());
        shippingService.saveShipping(orderRequestDTO.shipping());

        order.setOrderDate(LocalDateTime.now());
        order.setOrderStatus(OrderStatus.ACCEPTED);
        order.setCustomerBillingData(orderRequestDTO.billing());
        order.setShippingData(orderRequestDTO.shipping());
        Order savedOrder = orderRepository.save(order);
        orderItemService.saveOrderItemsFromCart(orderRequestDTO.cartId(), savedOrder);

        return savedOrder.getId();
    }

    @Override
    public Order findOrderById(Long id) {
        try {
            Order order = orderRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);

            if (order.getPayment() != null) {
                Payment payment = paymentService.getYPaySpecifiedTransaction(order.getPayment().getTransactionId());
                order.setPayment(payment);
                orderRepository.save(order);
            }

            return order;
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Order> findAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}

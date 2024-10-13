package com.dst.websiteprojectbackendspring.service.order;

import com.dst.websiteprojectbackendspring.dto.order.OrderRequestDTO;
import com.dst.websiteprojectbackendspring.model.order.Order;
import com.dst.websiteprojectbackendspring.model.order.OrderStatus;
import com.dst.websiteprojectbackendspring.model.payment.Payment;
import com.dst.websiteprojectbackendspring.model.payment.PaymentStatus;
import com.dst.websiteprojectbackendspring.repository.OrderRepository;
import com.dst.websiteprojectbackendspring.service.biling.BillingServiceImpl;
import com.dst.websiteprojectbackendspring.service.order_item.OrderItemServiceImpl;
import com.dst.websiteprojectbackendspring.service.payment.PaymentServiceImpl;
import com.dst.websiteprojectbackendspring.service.shipping.ShippingServiceImpl;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

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

        if (orderRequestDTO.authenticatedCustomerId() != null) {
            order.setAuthenticatedCustomerId(orderRequestDTO.authenticatedCustomerId());
        }


        log.info(orderRequestDTO.shipping().toString());
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
                Payment payment = paymentService.getTPaySpecifiedTransaction(order.getPayment().getTransactionId()).block();
                order.setPayment(payment);
                orderRepository.save(order);
            }

            return order;
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Page<Order> findAllOrders(PageRequest pageRequest) {
        updatePaymentsStatusBeforeFetchingItByUsers(null);
        Page<Order> allOrders =  orderRepository.findAll(pageRequest);
        List<Order> sortedOrders = allOrders.stream()
                .sorted(Comparator.comparing(Order::getId).reversed())
                .collect(Collectors.toList());


        return new PageImpl<>(sortedOrders, pageRequest, allOrders.getTotalElements());
    }

    @Override
    public List<Order> findOrdersByAuthenticatedCustomerId(Long userId) {
        updatePaymentsStatusBeforeFetchingItByUsers(userId);

        return orderRepository.findByAuthenticatedCustomerId(userId).stream()
                .sorted(Comparator.comparing(Order::getId).reversed())
                .toList();
    }

    private void updatePaymentsStatusBeforeFetchingItByUsers(Long userId) {
        List<Payment> payments;

        if (userId != null) {
            payments = orderRepository.findByAuthenticatedCustomerId(userId).stream()
                    .map(Order::getPayment)
                    .filter(payment -> !payment.getStatus().equals(PaymentStatus.CORRECT))
                    .toList();
        } else {
            payments = paymentService.findAllPayments().stream()
                    .filter(payment -> !payment.getStatus().equals(PaymentStatus.CORRECT))
                    .toList();
        }


        log.info("UPDATING TRANSACTIONS!");
        log.info("PAYMENTS: {}", payments);
        payments.forEach(payment -> paymentService.getTPaySpecifiedTransaction(payment.getTransactionId()));
    }

    @Override
    public void updateOrder(Long orderId, String orderStatus) {
        try {
            Order foundOrder = orderRepository.findById(orderId).orElseThrow(ChangeSetPersister.NotFoundException::new);
            foundOrder.setOrderStatus(OrderStatus.valueOf(orderStatus));
            orderRepository.save(foundOrder);
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}

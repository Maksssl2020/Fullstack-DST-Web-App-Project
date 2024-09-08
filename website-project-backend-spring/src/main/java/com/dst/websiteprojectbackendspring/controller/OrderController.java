package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.dto.order.OrderRequestDTO;
import com.dst.websiteprojectbackendspring.model.order.Order;
import com.dst.websiteprojectbackendspring.service.order.OrderServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/orders")
public class OrderController {

    private final OrderServiceImpl orderService;

    @GetMapping("/find-all")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.findAllOrders());
    }

    @GetMapping("/user-orders/{userId}")
    public ResponseEntity<List<Order>> getUserOrders(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.findOrdersByAuthenticatedCustomerId(userId));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrder(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.findOrderById(orderId));
    }

    @PostMapping("/save-order")
    public ResponseEntity<Long> saveNewOrder(@RequestBody OrderRequestDTO orderRequestDTO) {
        return new ResponseEntity<>(orderService.saveOrder(orderRequestDTO), HttpStatus.CREATED);
    }

    @PutMapping("/update-order-status/{orderId}")
    public ResponseEntity<HttpStatus> updateOrder(@PathVariable Long orderId, @RequestParam("orderStatus") String orderStatus) {
        orderService.updateOrder(orderId, orderStatus);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
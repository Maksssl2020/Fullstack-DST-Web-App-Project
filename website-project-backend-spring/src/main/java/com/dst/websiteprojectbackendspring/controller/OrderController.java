package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.dto.order.OrderDTO;
import com.dst.websiteprojectbackendspring.dto.order.OrderRequestDTO;
import com.dst.websiteprojectbackendspring.service.order.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/orders")
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/find-all")
    public ResponseEntity<Page<OrderDTO>> getAllOrders(@RequestParam int page, @RequestParam int size) {
        return ResponseEntity.ok(orderService.findAllOrders(PageRequest.of(page, size)));
    }

    @GetMapping("/user-orders/{userId}")
    public ResponseEntity<List<OrderDTO>> getUserOrders(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.findOrdersByAuthenticatedCustomerId(userId));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDTO> getOrder(@PathVariable Long orderId) {
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

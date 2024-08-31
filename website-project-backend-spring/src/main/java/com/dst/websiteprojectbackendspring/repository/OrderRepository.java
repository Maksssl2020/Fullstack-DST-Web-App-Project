package com.dst.websiteprojectbackendspring.repository;

import com.dst.websiteprojectbackendspring.model.order.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByAuthenticatedCustomerId(Long customerId);
}

package com.dst.websiteprojectbackendspring.repository;

import com.dst.websiteprojectbackendspring.model.payment.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Payment findByTransactionId(String transactionId);
}

package com.dst.websiteprojectbackendspring.repository;

import com.dst.websiteprojectbackendspring.model.billing.Billing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillingRepository extends JpaRepository<Billing, Long> {
}

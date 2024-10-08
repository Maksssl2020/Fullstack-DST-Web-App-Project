package com.dst.websiteprojectbackendspring.repository;

import com.dst.websiteprojectbackendspring.model.shipping.Shipping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShippingRepository extends JpaRepository<Shipping, Long> {
}

package com.dst.websiteprojectbackendspring.repository;

import com.dst.websiteprojectbackendspring.model.product.gadget.Gadget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GadgetRepository extends JpaRepository<Gadget, Long> {
}

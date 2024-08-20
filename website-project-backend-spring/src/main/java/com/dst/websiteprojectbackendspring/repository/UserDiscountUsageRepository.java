package com.dst.websiteprojectbackendspring.repository;

import com.dst.websiteprojectbackendspring.model.discount_code.UserDiscountUsage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDiscountUsageRepository extends JpaRepository<UserDiscountUsage, Long> {

    boolean existsByDiscountCodeIdAndUserId(Long discountCodeId, Long userId);
    UserDiscountUsage findByDiscountCodeIdAndUserId(Long discountCodeId, Long userId);
}

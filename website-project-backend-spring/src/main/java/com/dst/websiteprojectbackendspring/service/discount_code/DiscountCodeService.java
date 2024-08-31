package com.dst.websiteprojectbackendspring.service.discount_code;

import com.dst.websiteprojectbackendspring.model.discount_code.DiscountCode;
import com.dst.websiteprojectbackendspring.model.discount_code.DiscountCodeRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public interface DiscountCodeService {

    List<DiscountCode> getDiscountCodes();
    void saveDiscountCode(DiscountCodeRequest discountCodeRequest);
    DiscountCode getDiscountCode(String discountCode);
    BigDecimal applyGlobalDiscount(String discountCode, Long userId);
    BigDecimal applyNonGlobalDiscount(String discountCode);
    String generateDiscountCode();
    boolean isDiscountCodeValid(String discountCodeId);
    boolean isDiscountCodeUnique(String code);
    void increaseUsedCount(DiscountCode discountCode);
    void deleteDiscountCode(Long discountCodeId);
}

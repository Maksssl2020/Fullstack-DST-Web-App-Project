package com.dst.websiteprojectbackendspring.service.discount_code;

import com.dst.websiteprojectbackendspring.dto.discount_code.DiscountCodeDTO;
import com.dst.websiteprojectbackendspring.model.discount_code.DiscountCode;
import com.dst.websiteprojectbackendspring.model.discount_code.DiscountCodeRequest;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public interface DiscountCodeService {

    List<DiscountCodeDTO> getDiscountCodes();
    void saveDiscountCode(DiscountCodeRequest discountCodeRequest);
    DiscountCode getDiscountCode(String discountCode) throws ChangeSetPersister.NotFoundException;
    DiscountCodeDTO getDiscountCodeDTO(String discountCode) throws ChangeSetPersister.NotFoundException;
    BigDecimal applyGlobalDiscount(String discountCode, Long userId) throws ChangeSetPersister.NotFoundException;
    BigDecimal applyNonGlobalDiscount(String discountCode) throws ChangeSetPersister.NotFoundException;
    String generateDiscountCode();
    boolean isDiscountCodeValid(String discountCodeId) throws ChangeSetPersister.NotFoundException;
    boolean isDiscountCodeUnique(String code);
    void increaseUsedCount(DiscountCode discountCode);
    void deleteDiscountCode(Long discountCodeId);
}

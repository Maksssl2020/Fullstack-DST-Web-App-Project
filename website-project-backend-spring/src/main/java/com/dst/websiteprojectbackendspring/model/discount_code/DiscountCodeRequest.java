package com.dst.websiteprojectbackendspring.model.discount_code;

public record DiscountCodeRequest(String code, String discountType, String discountValue, String minimumOrderValue, Long numberOfValidityDays, Integer usageLimit, boolean isGlobal) {
}
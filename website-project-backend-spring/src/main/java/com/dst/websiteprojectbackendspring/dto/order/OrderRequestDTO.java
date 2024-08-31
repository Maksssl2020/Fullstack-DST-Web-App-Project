package com.dst.websiteprojectbackendspring.dto.order;

import com.dst.websiteprojectbackendspring.model.billing.Billing;
import com.dst.websiteprojectbackendspring.model.shipping.Shipping;

public record OrderRequestDTO(Long cartId, Long authenticatedCustomerId, Billing billing, Shipping shipping) {
}

package com.dst.websiteprojectbackendspring.dto.order;

import com.dst.websiteprojectbackendspring.model.billing.Billing;
import com.dst.websiteprojectbackendspring.model.shipping.Shipping;

public record OrderRequestDTO(Long cartId, Billing billing, Shipping shipping) {
}

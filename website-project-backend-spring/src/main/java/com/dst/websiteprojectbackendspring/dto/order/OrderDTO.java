package com.dst.websiteprojectbackendspring.dto.order;

import com.dst.websiteprojectbackendspring.dto.billing.BillingDTO;
import com.dst.websiteprojectbackendspring.dto.order_item.OrderItemDTO;
import com.dst.websiteprojectbackendspring.dto.payment.PaymentDTO;
import com.dst.websiteprojectbackendspring.dto.shipping.ShippingDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class OrderDTO {

    private Long id;
    private Long authenticatedCustomerId;
    private LocalDateTime orderDate;
    private String orderStatus;
    private PaymentDTO payment;
    private BillingDTO customerBillingData;
    private ShippingDTO shippingData;
    private List<OrderItemDTO> purchasedItems;
}

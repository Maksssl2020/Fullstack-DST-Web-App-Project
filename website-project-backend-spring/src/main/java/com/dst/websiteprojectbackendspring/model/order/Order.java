package com.dst.websiteprojectbackendspring.model.order;

import com.dst.websiteprojectbackendspring.model.billing.Billing;
import com.dst.websiteprojectbackendspring.model.order_item.OrderItem;
import com.dst.websiteprojectbackendspring.model.payment.Payment;
import com.dst.websiteprojectbackendspring.model.shipping.Shipping;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime orderDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus orderStatus;

    @ManyToOne
    @JoinColumn(name = "payment_id", nullable = true)
    private Payment payment;

    @ManyToOne(optional = false)
    @JoinColumn(name = "billing_id", referencedColumnName = "id")
    private Billing customerBillingData;

    @ManyToOne(optional = false)
    @JoinColumn(name = "shipping_id", referencedColumnName = "id")
    private Shipping shippingData;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> purchasedItems = new ArrayList<>();
}

package com.dst.websiteprojectbackendspring.model.order_item;

import com.dst.websiteprojectbackendspring.model.order.Order;
import com.dst.websiteprojectbackendspring.model.product_item.ProductItem;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class OrderItem extends ProductItem {

    @ManyToOne(optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private Order order;
}

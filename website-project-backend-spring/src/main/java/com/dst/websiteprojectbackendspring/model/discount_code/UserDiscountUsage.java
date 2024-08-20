package com.dst.websiteprojectbackendspring.model.discount_code;

import com.dst.websiteprojectbackendspring.model.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "user_discount_usages")
public class UserDiscountUsage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "discount_code_id", nullable = false)
    private DiscountCode discountCode;

    private Integer usedCount;
}

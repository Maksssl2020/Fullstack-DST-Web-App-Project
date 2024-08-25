package com.dst.websiteprojectbackendspring.model.shipping;

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
@Table(name = "shippings")
public class Shipping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String city;
    private String postalCode;
    private String street;
    private String buildingNumber;

    @Enumerated(EnumType.STRING)
    private ShippingType shippingType;
}

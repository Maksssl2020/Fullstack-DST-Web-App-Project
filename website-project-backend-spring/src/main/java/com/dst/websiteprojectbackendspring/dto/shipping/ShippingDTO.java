package com.dst.websiteprojectbackendspring.dto.shipping;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ShippingDTO {
    private String city;
    private String postalCode;
    private String street;
    private String buildingNumber;
    private String shippingType;
}

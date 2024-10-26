package com.dst.websiteprojectbackendspring.dto.billing;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BillingDTO {

    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String companyName;
    private String city;
    private String postalCode;
    private String street;
    private String buildingNumber;
}

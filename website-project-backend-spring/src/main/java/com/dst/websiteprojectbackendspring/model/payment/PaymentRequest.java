package com.dst.websiteprojectbackendspring.model.payment;

public record PaymentRequest(String amount, String paymentDescription, String firstName, String lastName, String street, String city, String streetNumber, String postalCode, String phoneNumber, String email) {
}

package com.dst.websiteprojectbackendspring.model.request_to_admin;

public record RequestToAdminRequest(String requestType, String userEnteredValueToChange, Long userId) {
}

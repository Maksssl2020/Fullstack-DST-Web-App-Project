package com.dst.websiteprojectbackendspring.dto.request_to_admin;

public record RequestToAdminDTO(Long requestId, String requestType, boolean isAccepted, String enteredValueToChange , Long userId) {
}

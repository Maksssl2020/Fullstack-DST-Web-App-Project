package com.dst.websiteprojectbackendspring.dto.request_to_admin;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RequestToAdminDTO {
    private Long requestId;
    private String requestType;
    private boolean isAccepted;
    private String enteredValueToChange;
    private Long userId;
}

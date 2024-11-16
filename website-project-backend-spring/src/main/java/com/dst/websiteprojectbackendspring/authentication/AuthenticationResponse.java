package com.dst.websiteprojectbackendspring.authentication;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class AuthenticationResponse {

    private long userId;
    private String username;
    private String accessToken;
    private String refreshToken;
    private String role;
    private LocalDate creationDate;
}

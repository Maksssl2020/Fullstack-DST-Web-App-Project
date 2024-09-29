package com.dst.websiteprojectbackendspring.authentication;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationResponse {

    private String accessToken;
    private String refreshToken;
    private String userRole;
}

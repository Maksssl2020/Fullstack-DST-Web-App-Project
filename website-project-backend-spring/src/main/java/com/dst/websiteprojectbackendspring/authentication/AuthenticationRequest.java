package com.dst.websiteprojectbackendspring.authentication;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationRequest {

    @NotEmpty(message = "Username cannot be empty!")
    @NotBlank(message = "Username cannot be blank!")
    private String username;

    @NotEmpty(message = "Password cannot be empty!")
    @NotBlank(message = "Password cannot be blank!")
    @Size(min = 8, message = "Password should be 8 characters long minimum!")
    private String password;
}

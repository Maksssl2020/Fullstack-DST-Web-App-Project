package com.dst.websiteprojectbackendspring.authentication;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationRequest {

    @NotEmpty(message = "First name cannot be empty!")
    @NotBlank(message = "First name cannot be blank!")
    private String firstName;

    @NotEmpty(message = "Last name cannot be empty!")
    @NotBlank(message = "Last name cannot be blank!")
    private String lastName;

    @NotEmpty(message = "Username cannot be empty!")
    @NotBlank(message = "Username cannot be blank!")
    private String username;

    @NotEmpty(message = "Email cannot be empty!")
    @NotBlank(message = "Email cannot be blank!")
    @Email(message = "Incorrect email!")
    private String email;

    @Past(message = "Date must be in the past!")
    @NotNull(message = "Date of birth cannot be empty!")
    private LocalDate dateOfBirth;

    @NotEmpty(message = "Password cannot be empty!")
    @NotBlank(message = "Password cannot be blank!")
    @Size(min = 8, message = "Password should be 8 characters long minimum!")
    private String password;
}

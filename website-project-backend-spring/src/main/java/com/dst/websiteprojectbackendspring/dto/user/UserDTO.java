package com.dst.websiteprojectbackendspring.dto.user;

import com.dst.websiteprojectbackendspring.model.user.UserRole;

import java.time.LocalDate;

public record UserDTO(Long id, String firstName, String lastName, String username, String email, UserRole role, String phoneNumber, LocalDate accountCreationDate, LocalDate dateOfBirth) {
}

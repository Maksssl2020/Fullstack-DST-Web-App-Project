package com.dst.websiteprojectbackendspring.dto.user;

import com.dst.websiteprojectbackendspring.model.user.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private UserRole role;
    private String phoneNumber;
    private LocalDate accountCreationDate;
    private LocalDate dateOfBirth;
    private boolean accountLocked;
}

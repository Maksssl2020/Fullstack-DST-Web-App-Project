package com.dst.websiteprojectbackendspring.dto.user;

import com.dst.websiteprojectbackendspring.model.user.User;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class UserDTOMapper implements Function<User, UserDTO> {
    @Override
    public UserDTO apply(User user) {
        return new UserDTO(user.getId(), user.getFirstName(), user.getLastName(), user.getUsername(), user.getEmail(), user.getRole(), user.getPhoneNumber(), user.getAccountCreationDate(), user.getDateOfBirth(), user.isAccountLocked());
    }
}

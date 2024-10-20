package com.dst.websiteprojectbackendspring.mapper;

import com.dst.websiteprojectbackendspring.dto.user.UserDTO;
import com.dst.websiteprojectbackendspring.dto.user.UserDisplayDataDTO;
import com.dst.websiteprojectbackendspring.model.user.User;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserDTOMapper {

    private final ModelMapper modelMapper;

    public UserDTO mapUserIntoUserDTO(User user) {
        return modelMapper.map(user, UserDTO.class);
    }

    public UserDisplayDataDTO mapUserIntoUserDisplayDataDTO(User user) {
        return modelMapper.map(user, UserDisplayDataDTO.class);
    }
}

package com.dst.websiteprojectbackendspring.mapper;

import com.dst.websiteprojectbackendspring.dto.request_to_admin.RequestToAdminDTO;
import com.dst.websiteprojectbackendspring.model.request_to_admin.RequestToAdmin;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RequestToAdminDTOMapper {

    private final ModelMapper modelMapper;

    public RequestToAdminDTO mapRequestToAdminIntoRequestToAdminDTO(RequestToAdmin requestToAdmin) {
        return modelMapper.map(requestToAdmin, RequestToAdminDTO.class);
    }
}

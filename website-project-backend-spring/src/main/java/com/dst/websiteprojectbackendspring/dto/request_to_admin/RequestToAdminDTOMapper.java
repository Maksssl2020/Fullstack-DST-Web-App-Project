package com.dst.websiteprojectbackendspring.dto.request_to_admin;

import com.dst.websiteprojectbackendspring.model.request_to_admin.RequestToAdmin;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class RequestToAdminDTOMapper implements Function<RequestToAdmin, RequestToAdminDTO> {

    @Override
    public RequestToAdminDTO apply(RequestToAdmin requestToAdmin) {
        return new RequestToAdminDTO(requestToAdmin.getId(), requestToAdmin.getRequestToAdminType().toString(), requestToAdmin.isAccepted(), requestToAdmin.getUserEnteredValueToChange() , requestToAdmin.getUser().getId());
    }
}

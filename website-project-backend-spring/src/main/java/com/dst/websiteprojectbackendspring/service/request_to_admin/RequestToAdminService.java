package com.dst.websiteprojectbackendspring.service.request_to_admin;

import com.dst.websiteprojectbackendspring.dto.request_to_admin.RequestToAdminDTO;
import com.dst.websiteprojectbackendspring.model.request_to_admin.RequestToAdminRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RequestToAdminService {

    void saveRequestToAdmin(RequestToAdminRequest requestToAdmin);
    List<RequestToAdminDTO> getAllRequestToAdmin();
    List<RequestToAdminDTO> getAllNonAcceptedRequests();
    void acceptRequestToAdmin(Long requestId);
    void deleteRequestToAdmin(Long requestId);

}

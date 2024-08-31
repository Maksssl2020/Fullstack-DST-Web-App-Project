package com.dst.websiteprojectbackendspring.service.request_to_admin;

import com.dst.websiteprojectbackendspring.dto.request_to_admin.RequestToAdminDTO;
import com.dst.websiteprojectbackendspring.dto.request_to_admin.RequestToAdminDTOMapper;
import com.dst.websiteprojectbackendspring.model.request_to_admin.RequestToAdmin;
import com.dst.websiteprojectbackendspring.model.request_to_admin.RequestToAdminRequest;
import com.dst.websiteprojectbackendspring.model.request_to_admin.RequestToAdminType;
import com.dst.websiteprojectbackendspring.model.user.User;
import com.dst.websiteprojectbackendspring.repository.RequestToAdminRepository;
import com.dst.websiteprojectbackendspring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RequestToAdminServiceImpl implements RequestToAdminService {

    private final RequestToAdminRepository requestToAdminRepository;
    private final UserRepository userRepository;
    private final RequestToAdminDTOMapper requestToAdminDTOMapper;

    @Override
    public void saveRequestToAdmin(RequestToAdminRequest requestToAdmin) {
        try {
            User foundUser = userRepository.findById(requestToAdmin.userId()).orElseThrow(ChangeSetPersister.NotFoundException::new);
            RequestToAdmin request = RequestToAdmin.builder()
                    .requestToAdminType(RequestToAdminType.valueOf(requestToAdmin.requestType().toUpperCase()))
                    .userEnteredValueToChange(requestToAdmin.userEnteredValueToChange())
                    .user(foundUser)
                    .build();

            requestToAdminRepository.save(request);
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<RequestToAdminDTO> getAllRequestToAdmin() {
        return requestToAdminRepository.findAll().stream()
                .map(requestToAdminDTOMapper)
                .sorted(Comparator.comparing(RequestToAdminDTO::requestId).reversed())
                .toList();
    }

    @Override
    public List<RequestToAdminDTO> getAllNonAcceptedRequests() {
        return requestToAdminRepository.findAllNonHandleRequestsToAdmin().stream()
                .map(requestToAdminDTOMapper)
                .sorted(Comparator.comparing(RequestToAdminDTO::requestId).reversed())
                .toList();
    }

    @Override
    public void acceptRequestToAdmin(Long requestId) {
        try {
            RequestToAdmin foundRequest = requestToAdminRepository.findById(requestId).orElseThrow(ChangeSetPersister.NotFoundException::new);
            foundRequest.setAccepted(true);
            requestToAdminRepository.save(foundRequest);
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deleteRequestToAdmin(Long requestId) {
        requestToAdminRepository.deleteById(requestId);
    }
}

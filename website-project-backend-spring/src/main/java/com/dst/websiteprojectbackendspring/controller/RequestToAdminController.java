package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.dto.request_to_admin.RequestToAdminDTO;
import com.dst.websiteprojectbackendspring.model.request_to_admin.RequestToAdminRequest;
import com.dst.websiteprojectbackendspring.service.request_to_admin.RequestToAdminServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/requests-to-admin")
@RequiredArgsConstructor
public class RequestToAdminController {

    private final RequestToAdminServiceImpl requestToAdminService;

    @GetMapping("/find-all")
    public ResponseEntity<List<RequestToAdminDTO>> getAllRequestsToAdmin() {
        return ResponseEntity.ok(requestToAdminService.getAllNonAcceptedRequests());
    }

    @PostMapping("/create-request")
    public ResponseEntity<HttpStatus> createRequest(@RequestBody RequestToAdminRequest requestToAdminRequest) {
        requestToAdminService.saveRequestToAdmin(requestToAdminRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/accept-request/{requestId}")
    public ResponseEntity<HttpStatus> acceptRequest(@PathVariable Long requestId) {
        requestToAdminService.acceptRequestToAdmin(requestId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/delete-request/{requestId}")
    public ResponseEntity<HttpStatus> deleteRequest(@PathVariable Long requestId) {
        requestToAdminService.deleteRequestToAdmin(requestId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}

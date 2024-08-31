package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.authentication.AuthenticationRequest;
import com.dst.websiteprojectbackendspring.authentication.AuthenticationResponse;
import com.dst.websiteprojectbackendspring.authentication.AuthenticationService;
import com.dst.websiteprojectbackendspring.authentication.RegistrationRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<?> register(@RequestBody @Valid RegistrationRequest request) {
        authenticationService.register(request);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/activate-account")
    public ResponseEntity<HttpStatus> activateAccount(@RequestParam String activationCode) {
        authenticationService.activateAccount(activationCode);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody @Valid AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }
}

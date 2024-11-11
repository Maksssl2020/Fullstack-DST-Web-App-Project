package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.authentication.AuthenticationRequest;
import com.dst.websiteprojectbackendspring.authentication.AuthenticationResponse;
import com.dst.websiteprojectbackendspring.authentication.AuthenticationService;
import com.dst.websiteprojectbackendspring.authentication.RegistrationRequest;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

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

    @PostMapping("/refresh-token")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        authenticationService.refreshToken(request, response);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody String email) throws BadRequestException, MessagingException {
        return  ResponseEntity.ok(authenticationService.resetPassword(email));
    }
}

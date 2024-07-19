package com.dst.websiteprojectbackendspring.authentication;

import com.dst.websiteprojectbackendspring.repository.UserRepository;
import com.dst.websiteprojectbackendspring.security.jwt.JwtService;
import com.dst.websiteprojectbackendspring.domain.user.User;
import com.dst.websiteprojectbackendspring.domain.user.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public void register(RegistrationRequest request) {

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(UserRole.REGISTERED)
                .accountEnabled(true)
                .accountLocked(false)
                .build();
        userRepository.save(user);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(), request.getPassword()
                )
        );

        HashMap<String, Object> claims = new HashMap<>();
        User user = (User) authenticate.getPrincipal();
        claims.put("username", user.getUsername());
        String jwtToken = jwtService.generateJwtToken(claims, user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }
}

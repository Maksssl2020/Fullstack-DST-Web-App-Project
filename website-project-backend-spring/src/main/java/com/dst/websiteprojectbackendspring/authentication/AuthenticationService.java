package com.dst.websiteprojectbackendspring.authentication;

import com.dst.websiteprojectbackendspring.model.token.Token;
import com.dst.websiteprojectbackendspring.model.user.User;
import com.dst.websiteprojectbackendspring.model.user.UserRole;
import com.dst.websiteprojectbackendspring.repository.TokenRepository;
import com.dst.websiteprojectbackendspring.repository.UserRepository;
import com.dst.websiteprojectbackendspring.security.jwt.JwtService;
import com.dst.websiteprojectbackendspring.service.email.EmailServiceImpl;
import com.dst.websiteprojectbackendspring.service.email.EmailTemplateName;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final EmailServiceImpl emailService;
    private final TokenRepository tokenRepository;


    @Transactional
    public void register(RegistrationRequest request) {
        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(UserRole.REGISTERED)
                .dateOfBirth(request.getDateOfBirth())
                .accountCreationDate(LocalDate.now())
                .accountEnabled(false)
                .accountLocked(false)
                .build();

        userRepository.save(user);
        sendVerificationEmail(user);
    }

    private void sendVerificationEmail(User user) {
        String activationToken = generateActivationToken(user);

        try {
            emailService.sendVerificationEmail(
                    user.getEmail(),
                    user.getUsername(),
                    EmailTemplateName.ACTIVATE_ACCOUNT,
                    activationToken,
                    "Account Activation"
            );
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    private String generateActivationToken(User user) {
        String generateActivationCode = generateActivationCode();
        Token token = Token.builder()
                .token(generateActivationCode)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(20))
                .user(user)
                .build();

        tokenRepository.save(token);
        return generateActivationCode;
    }

    private String generateActivationCode() {
        String characters = "0123456789";
        StringBuilder activationCodeBuilder = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < 6; i++) {
            int randomIndex = random.nextInt(characters.length());
            activationCodeBuilder.append(characters.charAt(randomIndex));
        }

        return activationCodeBuilder.toString();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        HashMap<String, Object> claims = new HashMap<>();
        User user = (User) authenticate.getPrincipal();
        claims.put("username", user.getUsername());
        claims.put("accountCreationDate", user.getAccountCreationDate());
        String jwtToken = jwtService.generateJwtToken(claims, user);

        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    @Transactional
    public void activateAccount(String activationCode) {
        Token foundToken;
        User foundUser;

        try {
            foundToken = tokenRepository.findByToken(activationCode).orElseThrow(ChangeSetPersister.NotFoundException::new);
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException("There is no code like entered!");
        }

        if (LocalDateTime.now().isAfter(foundToken.getExpiresAt())) {
            sendVerificationEmail(foundToken.getUser());
            throw new RuntimeException("Activation code has expired! New e-mail activation has been sent.");
        }

        try {
            foundUser = userRepository.findById(foundToken.getUser().getId()).orElseThrow(ChangeSetPersister.NotFoundException::new);
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }

        foundUser.setAccountEnabled(true);
        userRepository.save(foundUser);

        foundToken.setExpiresAt(LocalDateTime.now());
        tokenRepository.save(foundToken);
    }
}

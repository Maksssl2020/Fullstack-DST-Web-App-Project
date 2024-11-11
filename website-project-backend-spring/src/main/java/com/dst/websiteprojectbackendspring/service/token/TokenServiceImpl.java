package com.dst.websiteprojectbackendspring.service.token;

import com.dst.websiteprojectbackendspring.helpers.TokenEncryptor;
import com.dst.websiteprojectbackendspring.model.token.Token;
import com.dst.websiteprojectbackendspring.model.token.TokenType;
import com.dst.websiteprojectbackendspring.model.user.User;
import com.dst.websiteprojectbackendspring.repository.TokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService {

    public static final String ACCOUNT_ACTIVATION_CODE_NUMBERS = "0123456789";
    private final TokenRepository tokenRepository;

    public static Token createToken(String token, TokenType type, User user) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expiresAt = getTokenExpiredDateDependsOnTokenType(type);

        log.info(token);

        return Token.builder()
                .token(token)
                .createdAt(now)
                .expiresAt(expiresAt)
                .type(type)
                .user(user)
                .build();
    }

    private static LocalDateTime getTokenExpiredDateDependsOnTokenType(TokenType tokenType) {
        log.info(tokenType.toString());

        return switch (tokenType) {
            case ACCOUNT_ACTIVATION -> LocalDateTime.now().plusMinutes(20);
            case RESET_PASSWORD -> LocalDateTime.now().minusMinutes(15);
            default -> LocalDateTime.now().plusHours(2);
        };
    }

    @Override
    public void save(Token token) {
        tokenRepository.save(token);
    }

    @Override
    public void saveAll(List<Token> tokens) {
        tokenRepository.saveAll(tokens);
    }

    @Override
    public List<Token> findAllValidUserAuthenticationTokens(Long userId) {
        return tokenRepository.findAll().stream()
                .filter(token -> token.getUser().getId().equals(userId))
                .filter(token -> token.getType().equals(TokenType.USER_AUTHENTICATION))
                .filter(this::isTokenValid)
                .toList();
    }

    @Override
    public Token findTokenByToken(String token, TokenType type) throws ChangeSetPersister.NotFoundException {

        if (type.equals(TokenType.ACCOUNT_ACTIVATION)) {
            return tokenRepository.findByToken(token).orElseThrow(ChangeSetPersister.NotFoundException::new);
        }

        try {
            String decryptedToken = TokenEncryptor.decryptToken(token);
            return tokenRepository.findByToken(decryptedToken).orElseThrow(ChangeSetPersister.NotFoundException::new);
        } catch (NoSuchPaddingException | NoSuchAlgorithmException | InvalidKeyException | IllegalBlockSizeException |
                 BadPaddingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String generateAccountActivationToken(User user) {
        String characters = ACCOUNT_ACTIVATION_CODE_NUMBERS;
        StringBuilder activationCodeBuilder = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < 6; i++) {
            int randomIndex = random.nextInt(characters.length());
            activationCodeBuilder.append(characters.charAt(randomIndex));
        }

        log.info(activationCodeBuilder.toString());

        Token generatedToken = createToken(activationCodeBuilder.toString(), TokenType.ACCOUNT_ACTIVATION, user);
        tokenRepository.save(generatedToken);
        return generatedToken.getToken();
    }

    @Override
    public String generatePasswordResetToken(User user) {
        String generatedCode = UUID.randomUUID().toString();

        try {
            String encryptedCode = TokenEncryptor.encryptToken(generatedCode);

            Token generatedToken = createToken(generatedCode, TokenType.RESET_PASSWORD, user);
            save(generatedToken);
            return encryptedCode;

        } catch (NoSuchPaddingException | NoSuchAlgorithmException | InvalidKeyException | IllegalBlockSizeException |
                 BadPaddingException e) {
            throw new RuntimeException(e);
        }
    }

    private boolean isTokenValid(Token token) {
        return token.getExpiresAt().isAfter(LocalDateTime.now()) && token.getValidatedAt() == null;
    }
}

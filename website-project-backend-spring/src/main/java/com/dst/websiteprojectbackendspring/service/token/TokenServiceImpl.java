package com.dst.websiteprojectbackendspring.service.token;

import com.dst.websiteprojectbackendspring.model.token.Token;
import com.dst.websiteprojectbackendspring.model.token.TokenType;
import com.dst.websiteprojectbackendspring.model.user.User;
import com.dst.websiteprojectbackendspring.repository.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService {

    private final TokenRepository tokenRepository;

    public static Token createToken(String token, TokenType type, User user) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expiresAt = type.equals(TokenType.USER_AUTHENTICATION)
                ? now.plusHours(12)
                : now.plusMinutes(20);

         return Token.builder()
                .token(token)
                .createdAt(now)
                .expiresAt(expiresAt)
                .type(type)
                .user(user)
                .build();
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
    public Token findTokenByToken(String token) throws ChangeSetPersister.NotFoundException {
        return tokenRepository.findByToken(token).orElseThrow(ChangeSetPersister.NotFoundException::new);
    }

    private boolean isTokenValid(Token token) {
        return token.getExpiresAt().isAfter(LocalDateTime.now()) && token.getValidatedAt() == null;
    }
}

package com.dst.websiteprojectbackendspring.service.token;

import com.dst.websiteprojectbackendspring.model.token.Token;
import com.dst.websiteprojectbackendspring.model.token.TokenType;
import com.dst.websiteprojectbackendspring.model.user.User;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TokenService {

    void save(Token token);
    void saveAll(List<Token> tokens);
    List<Token> findAllValidUserAuthenticationTokens(Long userId);
    Token findTokenByToken(String token, TokenType type) throws ChangeSetPersister.NotFoundException;
    String generateAccountActivationToken(User user);
    String generatePasswordResetToken(User user);
}

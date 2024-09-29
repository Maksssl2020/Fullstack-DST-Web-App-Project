package com.dst.websiteprojectbackendspring.service.token;

import com.dst.websiteprojectbackendspring.model.token.Token;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TokenService {

    void save(Token token);
    void saveAll(List<Token> tokens);
    List<Token> findAllValidUserAuthenticationTokens(Long userId);
    Token findTokenByToken(String token) throws ChangeSetPersister.NotFoundException;
}

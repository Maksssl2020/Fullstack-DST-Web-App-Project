package com.dst.websiteprojectbackendspring.service.external_token;

import com.dst.websiteprojectbackendspring.model.external_token.ExternalToken;
import com.dst.websiteprojectbackendspring.model.external_token.ExternalTokenType;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public interface ExternalTokenService {

    void saveToken(String tokenData, ExternalTokenType externalTokenType, LocalDateTime issuedAt, LocalDateTime expiresIn);
    ExternalToken getToken(ExternalTokenType externalTokenType);
    void updateToken(ExternalTokenType externalTokenType, String tokenData, LocalDateTime issuedAt, LocalDateTime expiresIn);
}

package com.dst.websiteprojectbackendspring.service.external_token;

import com.dst.websiteprojectbackendspring.model.external_token.ExternalToken;
import com.dst.websiteprojectbackendspring.model.external_token.ExternalTokenType;
import com.dst.websiteprojectbackendspring.repository.ExternalTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class ExternalTokenServiceImpl implements ExternalTokenService {

    @Value("${security.external-token.secret-key}")
    private String secretKey;
    private final ExternalTokenRepository externalTokenRepository;


    @Override
    public void saveToken(String tokenData, ExternalTokenType externalTokenType, LocalDateTime issuedAt, LocalDateTime expiresIn) {
        String encryptedTokenData = encrypt(tokenData);

        externalTokenRepository.save(
                ExternalToken.builder()
                        .token(encryptedTokenData)
                        .tokenType(externalTokenType)
                        .issuedAt(issuedAt)
                        .expiresIn(expiresIn)
                        .build()
        );
    }

    @Override
    public ExternalToken getToken(ExternalTokenType externalTokenType) {
        ExternalToken foundToken = externalTokenRepository.findByTokenType(externalTokenType);
        String decrypted = decrypt(foundToken.getToken());

        return ExternalToken.builder()
                .id(foundToken.getId())
                .token(decrypted)
                .tokenType(externalTokenType)
                .issuedAt(foundToken.getIssuedAt())
                .expiresIn(foundToken.getExpiresIn())
                .build();
    }

    @Override
    public void updateToken(ExternalTokenType externalTokenType, String tokenData, LocalDateTime issuedAt, LocalDateTime expiresIn) {
        ExternalToken foundToken = externalTokenRepository.findByTokenType(externalTokenType);

        String encryptedTokenData = encrypt(tokenData);
        foundToken.setToken(encryptedTokenData);
        foundToken.setIssuedAt(issuedAt);
        foundToken.setExpiresIn(expiresIn);
        externalTokenRepository.save(foundToken);
    }

    private SecretKeySpec createSecretKeySpec() {
        return new SecretKeySpec(secretKey.getBytes(), "AES");
    }

    private String encrypt(String tokenData) {
        try {
            Cipher cipher = Cipher.getInstance("AES");
            cipher.init(Cipher.ENCRYPT_MODE, createSecretKeySpec());
            byte[] encryptedData = cipher.doFinal(tokenData.getBytes());

            return Base64.getEncoder().encodeToString(encryptedData);
        } catch (NoSuchAlgorithmException | IllegalBlockSizeException | NoSuchPaddingException | InvalidKeyException |
                 BadPaddingException e) {
            throw new RuntimeException(e);
        }
    }

    public String decrypt(String encryptedTokenData) {
        try {
            Cipher cipher = Cipher.getInstance("AES");
            cipher.init(Cipher.DECRYPT_MODE, createSecretKeySpec());
            byte[] decodedData = Base64.getDecoder().decode(encryptedTokenData);
            byte[] originData = cipher.doFinal(decodedData);

            return new String(originData);
        } catch (NoSuchAlgorithmException | InvalidKeyException | IllegalBlockSizeException | BadPaddingException |
                 NoSuchPaddingException e) {
            throw new RuntimeException(e);
        }
    }
}

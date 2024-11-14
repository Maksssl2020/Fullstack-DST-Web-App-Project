package com.dst.websiteprojectbackendspring.service.token;

import com.dst.websiteprojectbackendspring.model.token.Token;
import com.dst.websiteprojectbackendspring.model.token.TokenType;
import com.dst.websiteprojectbackendspring.model.user.User;
import com.dst.websiteprojectbackendspring.model.user.UserRole;
import com.dst.websiteprojectbackendspring.repository.TokenRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TokenServiceImplTest {

    @Mock
    private TokenRepository tokenRepository;

    @InjectMocks
    private TokenServiceImpl tokenService;

    private User testUser1;
    private Token testToken1;

    @BeforeEach
    void setUp() {
        testUser1 = User.builder()
                .firstName("Test1")
                .lastName("Test1")
                .username("Test1")
                .email("Test1@gmail.com")
                .password("1234")
                .role(UserRole.REGISTERED)
                .dateOfBirth(LocalDate.now().minusYears(20))
                .accountCreationDate(LocalDate.now())
                .accountEnabled(false)
                .accountLocked(false)
                .build();

        testToken1 = Token.builder()
                .id(1L)
                .type(TokenType.ACCOUNT_ACTIVATION)
                .user(testUser1)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(20))
                .token("123456")
                .build();
    }

    @Test
    void test() {
        Duration duration = Duration.ofMillis(42300000);
        LocalDateTime plus = LocalDateTime.now().plus(duration);
    }

    @Test
    void shouldGenerateNewActivationToken() {
        when(tokenRepository.save(any(Token.class))).thenReturn(testToken1);

        String tokenCode = tokenService.generateAccountActivationToken(testUser1);

        assertThat(tokenCode).isNotNull();
        assertThat(tokenCode.length()).isEqualTo(testToken1.getToken().length());
        verify(tokenRepository, times(1)).save(any(Token.class));
    }

    @Test
    void shouldFindSavedTokenByTokenCode() throws ChangeSetPersister.NotFoundException {
        when(tokenRepository.findByToken(testToken1.getToken())).thenReturn(Optional.of(testToken1));
        Token foundToken = tokenService.findTokenByToken(testToken1.getToken(), testToken1.getType());

        assertThat(foundToken).isNotNull();
        assertThat(foundToken.getId()).isEqualTo(testToken1.getId());
        assertThat(foundToken.getType()).isEqualTo(testToken1.getType());
        assertThat(foundToken.getToken()).isEqualTo(testToken1.getToken());
        verify(tokenRepository, times(1)).findByToken(testToken1.getToken());
    }
}
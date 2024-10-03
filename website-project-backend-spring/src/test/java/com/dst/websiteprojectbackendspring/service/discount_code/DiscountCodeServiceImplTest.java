package com.dst.websiteprojectbackendspring.service.discount_code;

import com.dst.websiteprojectbackendspring.model.discount_code.DiscountCode;
import com.dst.websiteprojectbackendspring.model.discount_code.DiscountCodeRequest;
import com.dst.websiteprojectbackendspring.model.discount_code.DiscountType;
import com.dst.websiteprojectbackendspring.model.user.User;
import com.dst.websiteprojectbackendspring.model.user.UserRole;
import com.dst.websiteprojectbackendspring.repository.DiscountCodeRepository;
import com.dst.websiteprojectbackendspring.repository.UserDiscountUsageRepository;
import com.dst.websiteprojectbackendspring.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DiscountCodeServiceImplTest {

    @Mock
    private DiscountCodeRepository discountCodeRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserDiscountUsageRepository usageRepository;

    @InjectMocks
    DiscountCodeServiceImpl discountCodeService;

    private User testUser1;
    private User testUser2;
    private DiscountCodeRequest testDiscountCodeRequest1;
    private DiscountCode testDiscountCode1;
    private DiscountCode testDiscountCode2;

    @BeforeEach
    void setUp() {
        testUser1 = User.builder()
                .id(1L)
                .email("test@gmail.com")
                .username("testUser")
                .accountCreationDate(LocalDate.now())
                .dateOfBirth(LocalDate.now().minusYears(18))
                .role(UserRole.REGISTERED)
                .firstName("Test")
                .lastName("Test")
                .password("1234")
                .build();

        testUser2 = User.builder()
                .id(2L)
                .email("test@gmail.com")
                .username("testUser")
                .accountCreationDate(LocalDate.now())
                .dateOfBirth(LocalDate.now().minusYears(18))
                .role(UserRole.REGISTERED)
                .firstName("Test")
                .lastName("Test")
                .password("1234")
                .build();

        testDiscountCodeRequest1 = new DiscountCodeRequest(
                "TEST1", "PERCENTAGE", "25.0",
                "50.0", 2L, 2, false
        );

        testDiscountCode1= DiscountCode.builder()
                .id(1L)
                .code("TEST1")
                .discountType(DiscountType.PERCENTAGE)
                .discountValue(new BigDecimal("25"))
                .usageLimit(2)
                .isActive(true)
                .minimumOrderValue(new BigDecimal("50.0"))
                .expirationDate(LocalDateTime.now().plusDays(2))
                .usedCount(0)
                .isGlobal(false)
                .build();

        testDiscountCode2= DiscountCode.builder()
                .id(2L)
                .code("TEST1")
                .discountType(DiscountType.PERCENTAGE)
                .discountValue(new BigDecimal("25"))
                .usageLimit(2)
                .isActive(true)
                .minimumOrderValue(new BigDecimal("50.0"))
                .expirationDate(LocalDateTime.now().plusDays(2))
                .usedCount(0)
                .isGlobal(true)
                .build();
    }

    @AfterEach
    void tearDown() {
        Mockito.reset(discountCodeRepository, userRepository, usageRepository);
    }

    @Test
    void shouldFindByCode() throws ChangeSetPersister.NotFoundException {
        when(discountCodeRepository.findByCode(testDiscountCode1.getCode())).thenReturn(Optional.of(testDiscountCode1));
        DiscountCode foundCode = discountCodeService.getDiscountCode(testDiscountCode1.getCode());

        assertThat(foundCode).isNotNull();
        assertThat(foundCode.getCode()).isEqualTo(testDiscountCode1.getCode());
        verify(discountCodeRepository).findByCode(testDiscountCode1.getCode());
    }

    @Test
    void shouldSaveDiscountCode() throws ChangeSetPersister.NotFoundException {
        when(discountCodeRepository.save(any(DiscountCode.class))).thenReturn(testDiscountCode1);
        when(discountCodeRepository.findByCode(anyString())).thenReturn(Optional.of(testDiscountCode1));

        discountCodeService.saveDiscountCode(testDiscountCodeRequest1);
        DiscountCode savedDiscountCode = discountCodeService.getDiscountCode(testDiscountCode1.getCode());

        assertThat(savedDiscountCode).isNotNull();
        assertThat(savedDiscountCode.getCode()).isEqualTo(testDiscountCode1.getCode());
        verify(discountCodeRepository, times(1)).save(any(DiscountCode.class));
    }

    @Test
    void shouldApplyNonGlobalDiscountCodeOneTime() throws ChangeSetPersister.NotFoundException {
        when(discountCodeRepository.findByCode(anyString())).thenReturn(Optional.of(testDiscountCode1));

        BigDecimal discountValue = discountCodeService.applyNonGlobalDiscount(testDiscountCode1.getCode());

        assertThat(discountValue).isNotNull();
        assertThat(discountValue).isEqualTo(testDiscountCode1.getDiscountValue());
    }

    @Test
    void shouldApplyGlobalDiscountCodeOneTimePerUser() throws ChangeSetPersister.NotFoundException {
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(testUser1));
        when(discountCodeRepository.findByCode(anyString())).thenReturn(Optional.of(testDiscountCode2));

        BigDecimal discountValue = discountCodeService.applyGlobalDiscount(testDiscountCode2.getCode(), testUser1.getId());

        assertThat(discountValue).isNotNull();
        assertThat(discountValue).isEqualTo(testDiscountCode2.getDiscountValue());
        assertThat(testDiscountCode2.getUsedCount()).isEqualTo((0));
    }

    @Test
    void shouldNotApplyNonGlobalDiscountCodeOverUsageLimit() throws ChangeSetPersister.NotFoundException {
        when(discountCodeRepository.findByCode(anyString())).thenReturn(Optional.of(testDiscountCode1));

        discountCodeService.applyNonGlobalDiscount(testDiscountCode1.getCode());
        discountCodeService.applyNonGlobalDiscount(testDiscountCode1.getCode());
        BigDecimal value = discountCodeService.applyNonGlobalDiscount(testDiscountCode1.getCode());

        assertThat(value).isNotNull();
        assertThat(value).isEqualTo(BigDecimal.ZERO);
        assertThat(testDiscountCode1.getUsedCount()).isEqualTo(2);
    }

    @Test
    void shouldApplyGlobalDiscountForTwoDifferentUsersWhenTheirSumOfUsagesIsOverUsageLimit() throws ChangeSetPersister.NotFoundException {
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(testUser1));
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(testUser2));
        when(discountCodeRepository.findByCode(anyString())).thenReturn(Optional.of(testDiscountCode2));

        discountCodeService.applyGlobalDiscount(testDiscountCode2.getCode(), testUser1.getId());
        discountCodeService.applyGlobalDiscount(testDiscountCode2.getCode(), testUser1.getId());
        BigDecimal value = discountCodeService.applyGlobalDiscount(testDiscountCode2.getCode(), testUser2.getId());

        assertThat(value).isNotNull();
        assertThat(value).isNotEqualTo(BigDecimal.ZERO);
    }
}
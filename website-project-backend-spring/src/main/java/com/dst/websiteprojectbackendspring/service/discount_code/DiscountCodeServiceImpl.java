package com.dst.websiteprojectbackendspring.service.discount_code;

import com.dst.websiteprojectbackendspring.dto.discount_code.DiscountCodeDTO;
import com.dst.websiteprojectbackendspring.helpers.RandomTextCodeGenerator;
import com.dst.websiteprojectbackendspring.mapper.DiscountCodeDTOMapper;
import com.dst.websiteprojectbackendspring.model.discount_code.DiscountCode;
import com.dst.websiteprojectbackendspring.model.discount_code.DiscountCodeRequest;
import com.dst.websiteprojectbackendspring.model.discount_code.DiscountType;
import com.dst.websiteprojectbackendspring.model.discount_code.UserDiscountUsage;
import com.dst.websiteprojectbackendspring.repository.DiscountCodeRepository;
import com.dst.websiteprojectbackendspring.repository.UserDiscountUsageRepository;
import com.dst.websiteprojectbackendspring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class DiscountCodeServiceImpl implements DiscountCodeService {

    private final DiscountCodeRepository discountCodeRepository;
    private final UserDiscountUsageRepository userDiscountUsageRepository;
    private final UserRepository userRepository;
    private final DiscountCodeDTOMapper discountCodeDTOMapper;

    @Override
    public List<DiscountCodeDTO> getDiscountCodes() {
        return discountCodeRepository.findAll()
                .stream()
                .map(discountCodeDTOMapper::mapDiscountCodeToDiscountCodeDTO)
                .sorted(Comparator.comparing(DiscountCodeDTO::getId).reversed())
                .toList();
    }

    @Override
    public void saveDiscountCode(DiscountCodeRequest discountCodeRequest) {
        DiscountCode discountCode = DiscountCode.builder()
                .code(discountCodeRequest.code())
                .discountType(DiscountType.valueOf(discountCodeRequest.discountType().toUpperCase()))
                .discountValue(new BigDecimal(discountCodeRequest.discountValue()))
                .minimumOrderValue(new BigDecimal(discountCodeRequest.minimumOrderValue()))
                .expirationDate(LocalDateTime.now().plusDays(discountCodeRequest.numberOfValidityDays()))
                .usageLimit(discountCodeRequest.usageLimit())
                .usedCount(0)
                .isActive(true)
                .isGlobal(discountCodeRequest.isGlobal())
                .build();

        discountCodeRepository.save(discountCode);
    }

    @Override
    public BigDecimal applyGlobalDiscount(String discountCode, Long userId) throws ChangeSetPersister.NotFoundException {
        DiscountCode foundDiscountCode = getDiscountCode(discountCode);

        if (isDiscountCodeValid(foundDiscountCode) && isPossibleToUseDiscountByUser(foundDiscountCode, userId)) {
            return foundDiscountCode.getDiscountValue();
        } else  {
            foundDiscountCode.setActive(false);
            return BigDecimal.ZERO;
        }
    }

    @Override
    public BigDecimal applyNonGlobalDiscount(String discountCode) throws ChangeSetPersister.NotFoundException {
        DiscountCode foundDiscountCode = getDiscountCode(discountCode);

        if (isDiscountCodeValid(foundDiscountCode) && foundDiscountCode.getUsedCount() + 1 <= foundDiscountCode.getUsageLimit()) {
            increaseUsedCount(foundDiscountCode);
            return foundDiscountCode.getDiscountValue();
        } else {
            foundDiscountCode.setActive(false);
            return BigDecimal.ZERO;
        }
    }

    @Override
    public boolean isDiscountCodeValid(String discountCode) throws ChangeSetPersister.NotFoundException {
        DiscountCode foundDiscountCode = getDiscountCode(discountCode);
        return isDiscountCodeValid(foundDiscountCode);
    }

    private boolean isDiscountCodeValid(DiscountCode foundDiscountCode) {
        return foundDiscountCode.isActive() || !LocalDateTime.now().isAfter(foundDiscountCode.getExpirationDate());
    }

    @Override
    public DiscountCode getDiscountCode(String discountCode) throws ChangeSetPersister.NotFoundException {
        return discountCodeRepository.findByCode(discountCode).orElseThrow(ChangeSetPersister.NotFoundException::new);
    }

    @Override
    public DiscountCodeDTO getDiscountCodeDTO(String discountCodeId) throws ChangeSetPersister.NotFoundException {
        DiscountCode foundDiscountCode = discountCodeRepository.findByCode(discountCodeId).orElseThrow(ChangeSetPersister.NotFoundException::new);
        return discountCodeDTOMapper.mapDiscountCodeToDiscountCodeDTO(foundDiscountCode);
    }

    private boolean isPossibleToUseDiscountByUser(DiscountCode discountCode, Long userId) {
        UserDiscountUsage userDiscountUsage = getUserDiscountUsage(discountCode, userId);

        if (userDiscountUsage.getUsedCount() + 1 <= discountCode.getUsageLimit()) {
            userDiscountUsage.setUsedCount(userDiscountUsage.getUsedCount() + 1);

            return true;
        } else {
            return false;
        }
    }

    private UserDiscountUsage getUserDiscountUsage(DiscountCode discountCode, Long userId) {
        if (userDiscountUsageRepository.existsByDiscountCodeIdAndUserId(discountCode.getId(), userId)) {
            return userDiscountUsageRepository.findByDiscountCodeIdAndUserId(discountCode.getId(), userId);
        } else {
            try {
                return UserDiscountUsage.builder()
                        .user(userRepository.findById(userId).orElseThrow(ChangeSetPersister.NotFoundException::new))
                        .discountCode(discountCode)
                        .usedCount(0)
                        .build();
            } catch (ChangeSetPersister.NotFoundException e) {
                throw new RuntimeException(e);
            }
        }
    }

    @Override
    public String generateDiscountCode() {
        String generatedCode;

        do {
            generatedCode = RandomTextCodeGenerator.generateCode(10);
        } while (isDiscountCodeUnique(generatedCode));

        return generatedCode;
    }

    @Override
    public boolean isDiscountCodeUnique(String code) {
        return discountCodeRepository
                .findAll()
                .stream()
                .anyMatch(discountCode -> discountCode.getCode().equals(code));
    }

    @Override
    public void increaseUsedCount(DiscountCode discountCode) {
        Integer usedCount = discountCode.getUsedCount();
        discountCode.setUsedCount(usedCount + 1);

        if (Objects.equals(discountCode.getUsedCount(), discountCode.getUsageLimit())) {
            discountCode.setActive(false);
        }

        discountCodeRepository.save(discountCode);
    }

    @Scheduled(cron = "0 0 */3 * * *") // every 3 hours at minute 0
    private void deleteNonRegisteredUsersCartsAfterInactivityForTwoDays() {
        LocalDateTime now = LocalDateTime.now();
        List<DiscountCode> discountCodes = discountCodeRepository.findAll();

        if (!discountCodes.isEmpty()) {
            discountCodes
                    .stream()
                    .filter(discountCode -> discountCode.getExpirationDate().isBefore(now))
                    .forEach(discountCode -> {
                        discountCode.setActive(false);
                        discountCodeRepository.save(discountCode);
                    });
        }
    }

    @Override
    public void deleteDiscountCode(Long discountCodeId) {
        discountCodeRepository.deleteById(discountCodeId);
    }
}

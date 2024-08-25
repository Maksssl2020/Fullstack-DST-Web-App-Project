package com.dst.websiteprojectbackendspring.service.biling;

import com.dst.websiteprojectbackendspring.model.billing.Billing;
import com.dst.websiteprojectbackendspring.repository.BillingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BillingServiceImpl implements BillingService {

    private final BillingRepository billingRepository;

    @Override
    public void saveBilling(Billing billing) {
        billingRepository.save(billing);
    }

    @Override
    public Billing fingBilling(Long id) {
        try {
            return billingRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}

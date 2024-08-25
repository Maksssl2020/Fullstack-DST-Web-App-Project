package com.dst.websiteprojectbackendspring.service.biling;

import com.dst.websiteprojectbackendspring.model.billing.Billing;
import org.springframework.stereotype.Service;

@Service
public interface BillingService {

    void saveBilling(Billing billing);
    Billing fingBilling(Long id);
}

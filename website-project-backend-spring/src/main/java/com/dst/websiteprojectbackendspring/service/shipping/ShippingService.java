package com.dst.websiteprojectbackendspring.service.shipping;

import com.dst.websiteprojectbackendspring.model.shipping.Shipping;
import org.springframework.stereotype.Service;

@Service
public interface ShippingService {

    void saveShipping(Shipping shipping);
    Shipping findShipping(Long id);
}

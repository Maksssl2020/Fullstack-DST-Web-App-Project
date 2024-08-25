package com.dst.websiteprojectbackendspring.service.shipping;

import com.dst.websiteprojectbackendspring.model.shipping.Shipping;
import com.dst.websiteprojectbackendspring.repository.ShippingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ShippingServiceImpl implements ShippingService {

    private final ShippingRepository shippingRepository;

    @Override
    public void saveShipping(Shipping shipping) {
        shippingRepository.save(shipping);
    }

    @Override
    public Shipping findShipping(Long id) {
        try {
            return shippingRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}

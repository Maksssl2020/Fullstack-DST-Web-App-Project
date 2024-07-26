package com.dst.websiteprojectbackendspring.service.product_size;

import com.dst.websiteprojectbackendspring.domain.product_size.ProductSize;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

@Service
public interface ProductSizeService {
    void save(Long productId, ProductSize productSize) throws ChangeSetPersister.NotFoundException;
}

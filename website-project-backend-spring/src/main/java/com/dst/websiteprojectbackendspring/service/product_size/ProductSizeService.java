package com.dst.websiteprojectbackendspring.service.product_size;

import com.dst.websiteprojectbackendspring.model.product_size.ProductSize;
import com.dst.websiteprojectbackendspring.dto.product_size.ProductSizeDTO;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductSizeService {
    void save(Long productId, ProductSize productSize) throws ChangeSetPersister.NotFoundException;
    List<ProductSizeDTO> findProductSizesByProductId(Long productId);
}

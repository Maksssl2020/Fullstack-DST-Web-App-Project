package com.dst.websiteprojectbackendspring.service.product_image;

import com.dst.websiteprojectbackendspring.model.product_image.ProductImage;
import com.dst.websiteprojectbackendspring.dto.product_image.ProductImageDTO;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductImageService {
    void saveProductImage(Long productId, ProductImage productImage) throws ChangeSetPersister.NotFoundException;
    List<ProductImageDTO> getProductImages(Long productId) throws ChangeSetPersister.NotFoundException;
}

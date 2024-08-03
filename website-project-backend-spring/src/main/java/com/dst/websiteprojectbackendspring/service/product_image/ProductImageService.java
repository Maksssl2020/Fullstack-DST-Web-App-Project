package com.dst.websiteprojectbackendspring.service.product_image;

import com.dst.websiteprojectbackendspring.domain.product.ProductImage;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductImageService {
    void saveProductImage(Long productId, ProductImage productImage) throws ChangeSetPersister.NotFoundException;
    List<ProductImage> getProductImages(Long productId) throws ChangeSetPersister.NotFoundException;
}

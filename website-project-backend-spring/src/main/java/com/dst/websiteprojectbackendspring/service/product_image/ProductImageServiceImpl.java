package com.dst.websiteprojectbackendspring.service.product_image;

import com.dst.websiteprojectbackendspring.domain.product.Product;
import com.dst.websiteprojectbackendspring.domain.product.ProductImage;
import com.dst.websiteprojectbackendspring.repository.ProductImageRepository;
import com.dst.websiteprojectbackendspring.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductImageServiceImpl implements ProductImageService {

    private final ProductImageRepository productImageRepository;
    private final ProductRepository productRepository;

    @Override
    public void saveProductImage(Long productId, ProductImage productImage) throws ChangeSetPersister.NotFoundException {
        Product product = productRepository.findById(productId).orElseThrow(ChangeSetPersister.NotFoundException::new);
        productImage.setProduct(product);
        productImageRepository.save(productImage);
    }

    @Override
    public List<ProductImage> getProductImages(Long productId) {
        return productImageRepository.findByProductId(productId);
    }
}

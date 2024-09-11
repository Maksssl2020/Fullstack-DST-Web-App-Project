package com.dst.websiteprojectbackendspring.service.product_image;

import com.dst.websiteprojectbackendspring.model.product.Product;
import com.dst.websiteprojectbackendspring.model.product_image.ProductImage;
import com.dst.websiteprojectbackendspring.dto.product_image.ProductImageDTO;
import com.dst.websiteprojectbackendspring.dto.product_image.ProductImageDTOMapper;
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
    private final ProductImageDTOMapper productImageDTOMapper;

    @Override
    public void saveProductImage(Long productId, ProductImage productImage) throws ChangeSetPersister.NotFoundException {
        Product product = productRepository.findById(productId).orElseThrow(ChangeSetPersister.NotFoundException::new);
        productImage.setProduct(product);
        productImageRepository.save(productImage);
    }

    @Override
    public List<ProductImageDTO> getProductImages(Long productId) {
        return productImageRepository.findByProductId(productId).stream()
                .map(productImageDTOMapper)
                .toList();
    }
}

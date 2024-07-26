package com.dst.websiteprojectbackendspring.service.product_size;

import com.dst.websiteprojectbackendspring.domain.product.Product;
import com.dst.websiteprojectbackendspring.domain.product_size.ProductSize;
import com.dst.websiteprojectbackendspring.repository.ProductRepository;
import com.dst.websiteprojectbackendspring.repository.ProductSizeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductSizeServiceImpl implements ProductSizeService {

    private final ProductSizeRepository productSizeRepository;
    private final ProductRepository productRepository;

    @Override
    public void save(Long productId, ProductSize productSize) throws ChangeSetPersister.NotFoundException {
        Product product = productRepository.findById(productId).orElseThrow(ChangeSetPersister.NotFoundException::new);
        productSize.setProduct(product);
        productSizeRepository.save(productSize);
    }
}

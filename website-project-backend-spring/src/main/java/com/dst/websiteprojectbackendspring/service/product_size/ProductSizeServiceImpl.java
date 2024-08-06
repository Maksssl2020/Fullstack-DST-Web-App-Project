package com.dst.websiteprojectbackendspring.service.product_size;

import com.dst.websiteprojectbackendspring.model.product.Product;
import com.dst.websiteprojectbackendspring.model.product_size.ProductSize;
import com.dst.websiteprojectbackendspring.dto.product_size.ProductSizeDTO;
import com.dst.websiteprojectbackendspring.dto.product_size.ProductSizeDTOMapper;
import com.dst.websiteprojectbackendspring.repository.ProductRepository;
import com.dst.websiteprojectbackendspring.repository.ProductSizeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductSizeServiceImpl implements ProductSizeService {

    private final ProductSizeRepository productSizeRepository;
    private final ProductRepository productRepository;
    private final ProductSizeDTOMapper productSizeDTOMapper;

    @Override
    public void save(Long productId, ProductSize productSize) throws ChangeSetPersister.NotFoundException {
        Product product = productRepository.findById(productId).orElseThrow(ChangeSetPersister.NotFoundException::new);
        productSize.setProduct(product);
        productSizeRepository.save(productSize);
    }

    @Override
    public List<ProductSizeDTO> findProductSizesByProductId(Long productId) {
        return productSizeRepository.findByProductId(productId)
                .stream()
                .map(productSizeDTOMapper)
                .toList();
    }
}

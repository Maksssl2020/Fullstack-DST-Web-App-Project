package com.dst.websiteprojectbackendspring.service.product_category;

import com.dst.websiteprojectbackendspring.domain.product.Product;
import com.dst.websiteprojectbackendspring.domain.product_category.ProductCategory;
import com.dst.websiteprojectbackendspring.repository.ProductCategoryRepository;
import com.dst.websiteprojectbackendspring.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductCategoryServiceImpl implements ProductCategoryService {

    private final ProductCategoryRepository productCategoryRepository;
    private final ProductRepository productRepository;

    @Override
    public void save(Long productId, ProductCategory productCategory) throws ChangeSetPersister.NotFoundException {
        Product product = productRepository.findById(productId).orElseThrow(ChangeSetPersister.NotFoundException::new);
        productCategory.setProduct(product);
        productCategoryRepository.save(productCategory);
    }
}

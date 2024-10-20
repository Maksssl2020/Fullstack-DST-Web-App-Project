package com.dst.websiteprojectbackendspring.service.product_category;

import com.dst.websiteprojectbackendspring.model.product.Product;
import com.dst.websiteprojectbackendspring.model.product_category.ProductCategory;
import com.dst.websiteprojectbackendspring.dto.product_category.ProductCategoryDTO;
import com.dst.websiteprojectbackendspring.mapper.ProductCategoryDTOMapper;
import com.dst.websiteprojectbackendspring.repository.ProductCategoryRepository;
import com.dst.websiteprojectbackendspring.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductCategoryServiceImpl implements ProductCategoryService {

    private final ProductCategoryRepository productCategoryRepository;
    private final ProductRepository productRepository;
    private final ProductCategoryDTOMapper productCategoryDTOMapper;

    @Override
    public void save(Long productId, ProductCategory productCategory) throws ChangeSetPersister.NotFoundException {
        Product product = productRepository.findById(productId).orElseThrow(ChangeSetPersister.NotFoundException::new);
        productCategory.setProduct(product);
        productCategoryRepository.save(productCategory);
    }

    @Override
    public List<ProductCategoryDTO> findAll() {
        return productCategoryRepository.findAll()
                .stream()
                .map(productCategoryDTOMapper::mapProductCategoryIntoProductCategoryDTO)
                .toList();
    }

    @Override
    public List<ProductCategoryDTO> findByProductId(Long productId) {
        return productCategoryRepository.findByProductId(productId)
                .stream()
                .map(productCategoryDTOMapper::mapProductCategoryIntoProductCategoryDTO)
                .toList();
    }
}

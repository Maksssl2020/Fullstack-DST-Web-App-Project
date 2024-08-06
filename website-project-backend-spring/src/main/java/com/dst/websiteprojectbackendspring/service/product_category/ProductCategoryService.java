package com.dst.websiteprojectbackendspring.service.product_category;

import com.dst.websiteprojectbackendspring.model.product_category.ProductCategory;
import com.dst.websiteprojectbackendspring.dto.product_category.ProductCategoryDTO;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductCategoryService {
    void save(Long productId, ProductCategory productCategory) throws ChangeSetPersister.NotFoundException;
    List<ProductCategoryDTO> findAll();
    List<ProductCategoryDTO> findByProductId(Long productId);
}

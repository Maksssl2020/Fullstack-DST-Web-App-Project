package com.dst.websiteprojectbackendspring.service.product_category;

import com.dst.websiteprojectbackendspring.domain.product_category.ProductCategory;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

@Service
public interface ProductCategoryService {
    void save(Long productId, ProductCategory productCategory) throws ChangeSetPersister.NotFoundException;
}

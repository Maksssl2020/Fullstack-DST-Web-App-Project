package com.dst.websiteprojectbackendspring.service.product;

import com.dst.websiteprojectbackendspring.model.product.Product;
import com.dst.websiteprojectbackendspring.dto.product.ProductDTOForCard;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductService {

    List<Product> findAllProducts();
    List<ProductDTOForCard> findAllProductsDTOForCard();
    Product findProductById(Long id) throws ChangeSetPersister.NotFoundException;
    ProductDTOForCard findProductDTOForCardById(Long id) throws ChangeSetPersister.NotFoundException;
}

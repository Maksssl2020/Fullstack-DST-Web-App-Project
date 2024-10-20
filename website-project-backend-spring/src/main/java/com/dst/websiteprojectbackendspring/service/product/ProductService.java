package com.dst.websiteprojectbackendspring.service.product;

import com.dst.websiteprojectbackendspring.dto.product.ProductDTO;
import com.dst.websiteprojectbackendspring.dto.product.ProductDTOForCard;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductService {

    List<ProductDTO> findAllProducts();
    List<ProductDTOForCard> findAllProductsDTOForCard(String category);
    ProductDTO findProductById(Long id) throws ChangeSetPersister.NotFoundException;
    ProductDTOForCard findProductDTOForCardById(Long id) throws ChangeSetPersister.NotFoundException;
    void deleteProductById(Long id);
}

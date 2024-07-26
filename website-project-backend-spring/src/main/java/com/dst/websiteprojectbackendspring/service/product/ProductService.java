package com.dst.websiteprojectbackendspring.service.product;

import com.dst.websiteprojectbackendspring.domain.product.Product;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface ProductService {

    void saveProduct(
            String title, String name, String color, String description,
            String packageSize, String weight, String productComposition,
            String productOverprint, String price, String[] productSizes,
            String[] categories, MultipartFile[] images
    );
    List<Product> getProducts();
    Product getProduct(int id);
    void updateProduct(Long id, Product product);
    void deleteProduct(Product product);
}

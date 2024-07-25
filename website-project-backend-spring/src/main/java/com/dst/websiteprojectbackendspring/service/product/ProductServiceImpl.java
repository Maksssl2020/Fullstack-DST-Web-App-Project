package com.dst.websiteprojectbackendspring.service.product;

import com.dst.websiteprojectbackendspring.domain.product.*;
import com.dst.websiteprojectbackendspring.repository.ProductRepository;
import com.dst.websiteprojectbackendspring.repository.ProductSizeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductSizeRepository productSizeRepository;

    @Override
    public void saveProduct(
            String title, String name, String color, String description,
            String packageSize, String weight, String productComposition,
            String productOverprint, String price, Set<String> productSizes,
            Set<String> categories, MultipartFile[] images
    ) {
        productRepository.save(setProduct(
                title, name, color, description,
                packageSize, weight, productComposition,
                productOverprint, price, productSizes, categories,
                images
        ));
    }

    @Override
    public List<Product> getProducts() {
        return List.of();
    }

    @Override
    public Product getProduct(int id) {
        return null;
    }

    @Override
    public void updateProduct(Long id, Product product) {

    }

    @Override
    public void deleteProduct(Product product) {

    }

    private Product setProduct(
            String title, String name, String color, String description,
            String packageSize, String weight, String productComposition,
            String productOverprint, String price, Set<String> productSizes,
            Set<String> categories, MultipartFile[] images
    ) {
        Product product = new Product();
        Set<ProductSize> productSizesSet = new HashSet<>();
        Set<ProductCategory> productCategoriesSet = new HashSet<>();
        List<ProductImage> imagesList = new ArrayList<>();

        product.setTitle(title);
        product.setName(name);
        product.setColor(color);
        product.setDescription(description);
        product.setPackageSize(packageSize);
        product.setWeight(weight);
        product.setProductComposition(productComposition);
        product.setProductOverprint(productOverprint);
        product.setPrice(new BigDecimal(price));

        productSizes.forEach(size -> {
            ProductSize productSize = new ProductSize();
            productSize.setSize(Size.valueOf(size.toUpperCase()));
            productSize.setProduct(product);
            productSizeRepository.save(productSize);
            productSizesSet.add(productSize);
        });
        product.setProductSize(productSizesSet);

        categories.forEach(category -> productCategoriesSet.add(ProductCategory.valueOf(category.toUpperCase())));
        product.setCategories(productCategoriesSet);

        if (images != null) {
            Arrays.stream(images).forEach(image -> {
                try {
                    ProductImage productImage = new ProductImage();
                    productImage.setImage(image.getBytes());
                    productImage.setProduct(product);
                    imagesList.add(productImage);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            });
            product.setImages(imagesList);
        } else {
            product.setImages(null);
        }

        return product;
    }
}

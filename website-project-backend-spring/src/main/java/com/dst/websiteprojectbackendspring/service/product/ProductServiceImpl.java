package com.dst.websiteprojectbackendspring.service.product;

import com.dst.websiteprojectbackendspring.domain.product.Product;
import com.dst.websiteprojectbackendspring.domain.product.ProductImage;
import com.dst.websiteprojectbackendspring.domain.product_category.Category;
import com.dst.websiteprojectbackendspring.domain.product_category.ProductCategory;
import com.dst.websiteprojectbackendspring.domain.product_size.ProductSize;
import com.dst.websiteprojectbackendspring.domain.product_size.Size;
import com.dst.websiteprojectbackendspring.repository.ProductRepository;
import com.dst.websiteprojectbackendspring.service.product_category.ProductCategoryServiceImpl;
import com.dst.websiteprojectbackendspring.service.product_image.ProductImageServiceImpl;
import com.dst.websiteprojectbackendspring.service.product_size.ProductSizeServiceImpl;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductSizeServiceImpl productSizeService;
    private final ProductCategoryServiceImpl productCategoryService;
    private final ProductImageServiceImpl productImageService;

    @Override
    @Transactional
    public void saveProduct(
            String title, String name, String color, String description,
            String packageSize, String weight, String productComposition,
            String productOverprint, String price, String[] productSizes,
            String[] categories, MultipartFile[] images
    ) {
        Product product = setProduct(
                title, name, color, description,
                packageSize, weight, productComposition,
                productOverprint, price
        );

        Arrays.stream(productSizes).forEach(size -> {
            ProductSize productSize = new ProductSize();
            productSize.setSize(Size.valueOf(size.toUpperCase()));

            try {
                productSizeService.save(product.getId(), productSize);
            } catch (ChangeSetPersister.NotFoundException e) {
                throw new RuntimeException(e);
            }
        });

        Arrays.stream(categories).forEach(category -> {
            ProductCategory productCategory = new ProductCategory();
            productCategory.setCategory(Category.valueOf(category.toUpperCase()));

            try {
                productCategoryService.save(product.getId(), productCategory);
            } catch (ChangeSetPersister.NotFoundException e) {
                throw new RuntimeException(e);
            }
        });

        Arrays.stream(images).forEach(image -> {
            try {
                ProductImage productImage = new ProductImage();
                productImage.setImage(image.getBytes());

                try {
                    productImageService.saveProductImage(product.getId(), productImage);
                } catch (ChangeSetPersister.NotFoundException e) {
                    throw new RuntimeException(e);
                }
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
    }

    @Override
    public List<Product> getProducts() {
        return productRepository.findAll();
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
            String productOverprint, String price
    ) {
        Product product = new Product();
        product.setTitle(title);
        product.setName(name);
        product.setColor(color);
        product.setDescription(description);
        product.setPackageSize(packageSize);
        product.setWeight(weight);
        product.setProductComposition(productComposition);
        product.setProductOverprint(productOverprint);
        product.setPrice(new BigDecimal(price));

        productRepository.save(product);
        return product;
    }
}

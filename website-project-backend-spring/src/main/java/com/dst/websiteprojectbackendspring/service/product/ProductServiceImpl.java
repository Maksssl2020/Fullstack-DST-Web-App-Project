package com.dst.websiteprojectbackendspring.service.product;

import com.dst.websiteprojectbackendspring.model.product.Product;
import com.dst.websiteprojectbackendspring.model.product.product_image.ProductImage;
import com.dst.websiteprojectbackendspring.model.product_category.Category;
import com.dst.websiteprojectbackendspring.model.product_category.ProductCategory;
import com.dst.websiteprojectbackendspring.model.product_size.ProductSize;
import com.dst.websiteprojectbackendspring.model.product_size.Size;
import com.dst.websiteprojectbackendspring.dto.product.ProductDTOForCard;
import com.dst.websiteprojectbackendspring.dto.product.ProductDTOForCardMapper;
import com.dst.websiteprojectbackendspring.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductServiceImpl<T extends Product> implements ProductService {

    private final ProductRepository productRepository;
    private final ProductDTOForCardMapper productDTOForCardMapper;

    @Override
    public List<Product> findAllProducts() {
        return productRepository
                .findAll()
                .stream()
                .sorted(Comparator.comparing(Product::getId).reversed())
                .toList();
    }

    @Override
    public List<ProductDTOForCard> findAllProductsDTOForCard() {
        return productRepository
                .findAll()
                .stream()
                .map(productDTOForCardMapper)
                .sorted(Comparator.comparing(ProductDTOForCard::id).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public Product findProductById(Long id) throws ChangeSetPersister.NotFoundException {
        return productRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
    }

    @Override
    public ProductDTOForCard findProductDTOForCardById(Long id) throws ChangeSetPersister.NotFoundException {
        return productRepository.findById(id)
                .map(productDTOForCardMapper)
                .orElseThrow(ChangeSetPersister.NotFoundException::new);
    }

    @Override
    public void deleteProductById(Long id) {
        productRepository.deleteById(id);
    }

    public T setProduct(
            T product, String title, String name, String description,
            String packageSize, String weight, String price
    ) {
        product.setTitle(title);
        product.setName(name);
        product.setDescription(description);
        product.setPackageSize(packageSize);
        product.setWeight(Double.parseDouble(weight));
        product.setPrice(new BigDecimal(price));

        return product;
    }

    protected List<ProductImage> createImages(MultipartFile[] images, T product) {
        log.info("IMAGES!");
        log.info(Arrays.toString(images));

        return Arrays.stream(images)
                .map(image -> {
                    ProductImage productImage = new ProductImage();
                    try {
                        productImage.setImage(image.getBytes());
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                    productImage.setProduct(product);

                    return productImage;
                })
                .collect(Collectors.toList());
    }

    protected List<ProductCategory> createProductCategories(List<String> productCategories, T product) {
        return productCategories
                .stream()
                .map(category -> {
                    ProductCategory productCategory = new ProductCategory();
                    productCategory.setCategory(Category.valueOf(category.toUpperCase()));
                    productCategory.setProduct(product);

                    return productCategory;
                })
                .collect(Collectors.toList());
    }

    protected List<ProductSize> createProductSizes(List<String> productSizes, T product) {
        return productSizes
                .stream()
                .map(size -> {
                    ProductSize productSize = new ProductSize();
                    productSize.setSize(Size.valueOf(size.toUpperCase()));
                    productSize.setProduct(product);

                    return productSize;
                })
                .collect(Collectors.toList());
    }
}

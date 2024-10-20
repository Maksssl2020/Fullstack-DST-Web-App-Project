package com.dst.websiteprojectbackendspring.service.product;

import com.dst.websiteprojectbackendspring.dto.product.ProductDTO;
import com.dst.websiteprojectbackendspring.mapper.ProductDTOMapper;
import com.dst.websiteprojectbackendspring.model.product.Product;
import com.dst.websiteprojectbackendspring.model.product_image.ProductImage;
import com.dst.websiteprojectbackendspring.model.product_category.Category;
import com.dst.websiteprojectbackendspring.model.product_category.ProductCategory;
import com.dst.websiteprojectbackendspring.model.product_size.ProductSize;
import com.dst.websiteprojectbackendspring.model.product_size.Size;
import com.dst.websiteprojectbackendspring.dto.product.ProductDTOForCard;
import com.dst.websiteprojectbackendspring.repository.ProductRepository;
import com.dst.websiteprojectbackendspring.service.cart_item.CartItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
    private final ProductDTOMapper productDTOMapper;

    private final CartItemService cartItemService;

    @Override
    public List<ProductDTO> findAllProducts() {
        return productRepository
                .findAll()
                .stream()
                .map(productDTOMapper::mapProductToProductDTO)
                .sorted(Comparator.comparing(ProductDTO::getId).reversed())
                .toList();
    }

    @Override
    @Transactional
    public List<ProductDTOForCard> findAllProductsDTOForCard(String category) {
        return productRepository
                .findAll()
                .stream()
                .filter(product -> product.containsCategory(category))
                .map(productDTOMapper::mapProductToProductDTOForCard)
                .sorted(Comparator.comparing(ProductDTOForCard::getId).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public ProductDTO findProductById(Long id) throws ChangeSetPersister.NotFoundException {
        Product foundProduct = productRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
        return productDTOMapper.mapProductToProductDTO(foundProduct);
    }

    @Override
    public ProductDTOForCard findProductDTOForCardById(Long id) throws ChangeSetPersister.NotFoundException {
        return productRepository.findById(id)
                .map(productDTOMapper::mapProductToProductDTOForCard)
                .orElseThrow(ChangeSetPersister.NotFoundException::new);
    }

    @Override
    public void deleteProductById(Long id) {
        cartItemService.deleteAllItemsWhichAreRelatedToDeletedShopProduct(id);
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
                    try {
                        ProductImage productImage = new ProductImage();
                        productImage.setImageData(image.getBytes());
                        productImage.setProduct(product);

                        return productImage;
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
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

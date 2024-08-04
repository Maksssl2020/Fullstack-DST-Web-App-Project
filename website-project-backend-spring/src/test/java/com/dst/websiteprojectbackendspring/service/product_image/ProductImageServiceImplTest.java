package com.dst.websiteprojectbackendspring.service.product_image;

import com.dst.websiteprojectbackendspring.domain.product.Product;
import com.dst.websiteprojectbackendspring.domain.product.product_image.ProductImage;
import com.dst.websiteprojectbackendspring.domain.product_category.Category;
import com.dst.websiteprojectbackendspring.domain.product_category.ProductCategory;
import com.dst.websiteprojectbackendspring.dto.product_image.ProductImageDTO;
import com.dst.websiteprojectbackendspring.dto.product_image.ProductImageDTOMapper;
import com.dst.websiteprojectbackendspring.repository.ProductImageRepository;
import com.dst.websiteprojectbackendspring.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class ProductImageServiceImplTest {

    @Mock
    private ProductImageRepository productImageRepository;

    @Mock
    private ProductRepository productRepository;

    @Mock
    private ProductImageDTOMapper productImageDTOMapper;

    @InjectMocks
    private ProductImageServiceImpl productImageService;

    private ProductImage productImage1;
    private ProductImage productImage2;
    private Product product;

    @BeforeEach
    void setUp() {
        product = Product.builder()
                .id(1L)
                .title("mug")
                .name("mug")
                .description("mug")
                .packageSize("22 x 22 x 22")
                .weight(2.5)
                .price(new BigDecimal("100"))
                .categories(new ArrayList<>(
                        List.of(ProductCategory.builder()
                                .category(Category.KUBKI)
                                .build()
                        )))
                .build();

        productImage1 = ProductImage.builder()
                .id(1L)
                .image("test data sample".getBytes())
                .product(product)
                .build();

        productImage2 = ProductImage.builder()
                .id(2L)
                .image("test data sample".getBytes())
                .product(product)
                .build();
    }

    @Test
    void canSaveNewProductImage() {
        given(productImageRepository.save(productImage1)).willReturn(productImage1);
        ProductImage savedProductImage = productImageRepository.save(productImage1);

        assertThat(savedProductImage).isNotNull();
        assertThat(savedProductImage.getImage()).isEqualTo(productImage1.getImage());
        verify(productImageRepository).save(productImage1);
    }

    @Test
    void canFindProductImagesByProductId() {
        given(productImageRepository.findByProductId(productImage1.getProduct().getId())).willReturn(List.of(productImage1, productImage2));
        List<ProductImageDTO> foundProductImages = productImageService.getProductImages(product.getId());

        assertThat(foundProductImages).isNotNull();
        assertThat(foundProductImages.size()).isEqualTo(2);
        verify(productImageRepository).findByProductId(productImage1.getProduct().getId());
    }
}
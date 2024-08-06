package com.dst.websiteprojectbackendspring.service.product_category;

import com.dst.websiteprojectbackendspring.model.product.Product;
import com.dst.websiteprojectbackendspring.model.product_category.Category;
import com.dst.websiteprojectbackendspring.model.product_category.ProductCategory;
import com.dst.websiteprojectbackendspring.dto.product_category.ProductCategoryDTO;
import com.dst.websiteprojectbackendspring.dto.product_category.ProductCategoryDTOMapper;
import com.dst.websiteprojectbackendspring.repository.ProductCategoryRepository;
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
class ProductCategoryServiceImplTest {

    @Mock
    private ProductCategoryRepository productCategoryRepository;

    @Mock
    private ProductRepository productRepository;

    @Mock
    private ProductCategoryDTOMapper productCategoryDTOMapper;

    @InjectMocks
    private ProductCategoryServiceImpl productCategoryService;

    private Product product;
    private ProductCategory productCategory1;
    private ProductCategory productCategory2;

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

        productCategory1 = ProductCategory.builder()
                .id(1L)
                .category(Category.AKCESORIA)
                .product(product)
                .build();

        productCategory2 = ProductCategory.builder()
                .id(2L)
                .category(Category.KUBKI)
                .product(product)
                .build();
    }

    @Test
    void canSaveNewProductCategory() {
        given(productCategoryRepository.save(productCategory1)).willReturn(productCategory1);
        ProductCategory savedCategory = productCategoryRepository.save(productCategory1);

        assertThat(savedCategory).isNotNull();
        assertThat(savedCategory.getId()).isEqualTo(productCategory1.getId());
        verify(productCategoryRepository).save(productCategory1);
    }

    @Test
    void canFindAllProductCategoriesByProductId() {
        given(productCategoryRepository.findByProductId(product.getId())).willReturn(List.of(productCategory1, productCategory2));
        List<ProductCategoryDTO> foundProductCategories = productCategoryService.findByProductId(product.getId());

        assertThat(foundProductCategories).isNotNull();
        assertThat(foundProductCategories.size()).isEqualTo(2);
        verify(productCategoryRepository).findByProductId(product.getId());
    }
}
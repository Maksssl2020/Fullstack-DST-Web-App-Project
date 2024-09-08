package com.dst.websiteprojectbackendspring.service.product;

import com.dst.websiteprojectbackendspring.model.product.Product;
import com.dst.websiteprojectbackendspring.model.product_category.Category;
import com.dst.websiteprojectbackendspring.model.product_category.ProductCategory;
import com.dst.websiteprojectbackendspring.dto.product.ProductDTOForCard;
import com.dst.websiteprojectbackendspring.dto.product.ProductDTOForCardMapper;
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
class ProductServiceImplTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private ProductDTOForCardMapper productDTOForCardMapper;

    @InjectMocks
    private ProductServiceImpl<Product> productService;

    private Product product1;
    private Product product2;
    private List<Product> productList;

    @BeforeEach
    void setUp() {
        product1 = Product.builder()
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

        product2 = Product.builder()
                .id(2L)
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

        productList = new ArrayList<>(List.of(product1, product2));
    }

    @Test
    void canAddNewProduct() {
        given(productRepository.save(product1)).willReturn(product1);
        Product savedProduct = productRepository.save(product1);

        assertThat(savedProduct).isNotNull();
        assertThat(savedProduct.getTitle()).isEqualTo("mug");
        verify(productRepository).save(product1);
    }

    @Test
    void canGetAllProducts() {
        given(productRepository.findAll()).willReturn(productList);
        List<Product> allProducts = productService.findAllProducts();

        assertThat(allProducts).isNotNull();
        assertThat(allProducts.size()).isEqualTo(2);
    }

    @Test
    void canMapProductsIntoProductDTOForCard() {
        given(productRepository.findAll()).willReturn(productList);
        given(productDTOForCardMapper.apply(product1))
                .willReturn(new ProductDTOForCard(product1.getId(), product1.getTitle(), product1.getPrice(), product1.getProductType().toString()));
        given(productDTOForCardMapper.apply(product2))
                .willReturn(new ProductDTOForCard(product2.getId(), product2.getTitle(), product2.getPrice(), product2.getProductType().toString()));

        List<ProductDTOForCard> allProductsDTO = productService.findAllProductsDTOForCard();

        assertThat(allProductsDTO).isNotNull();
        assertThat(allProductsDTO.size()).isEqualTo(2);

        verify(productRepository).findAll();
        verify(productDTOForCardMapper).apply(product1);
        verify(productDTOForCardMapper).apply(product2);
    }
}
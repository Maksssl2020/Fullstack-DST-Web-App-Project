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
}

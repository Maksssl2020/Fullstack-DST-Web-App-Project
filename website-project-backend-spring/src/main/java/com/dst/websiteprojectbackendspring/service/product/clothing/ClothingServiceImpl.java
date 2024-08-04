package com.dst.websiteprojectbackendspring.service.product.clothing;

import com.dst.websiteprojectbackendspring.domain.product.ProductType;
import com.dst.websiteprojectbackendspring.domain.product.clothing.Clothing;
import com.dst.websiteprojectbackendspring.dto.product.ProductDTOForCardMapper;
import com.dst.websiteprojectbackendspring.repository.ClothingRepository;
import com.dst.websiteprojectbackendspring.repository.ProductRepository;
import com.dst.websiteprojectbackendspring.service.product.ProductServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class ClothingServiceImpl extends ProductServiceImpl<Clothing> implements ClothingService {

    private final ClothingRepository clothingRepository;

    public ClothingServiceImpl(ProductRepository productRepository, ProductDTOForCardMapper productDTOForCardMapper, ClothingRepository clothingRepository) {
        super(productRepository, productDTOForCardMapper);
        this.clothingRepository = clothingRepository;
    }

    @Override
    @Transactional
    public void saveClothing(
            String title, String name, String description, String packageSize,
            String weight, String price, List<String> categories, MultipartFile[] images,
            String color, String productComposition, String productOverprint, List<String> productsSizes
    ) {
        Clothing clothing = setClothing(
                title, name, description, packageSize,
                weight, price, color, productComposition, productOverprint
        );
        clothingRepository.save(clothing);

        clothing.setImages(createImages(images, clothing));
        clothing.setCategories(createProductCategories(categories, clothing));
        clothing.setProductSize(createProductSizes(productsSizes, clothing));

        clothingRepository.save(clothing);
    }

    @Override
    public List<Clothing> findAllClothes() {
        return clothingRepository.findAll();
    }

    @Override
    public Clothing findClothingById(Long id) {
        return null;
    }

    @Override
    public void updateClothing(Long id, Clothing clothing) {

    }

    @Override
    public void deleteClothingById(Long id) {

    }

    public Clothing setClothing(
            String title, String name, String description, String packageSize,
            String weight, String price, String color, String productComposition, String productOverprint
    ) {
        Clothing clothing = setProduct(new Clothing(), title, name, description, packageSize, weight, price);
        clothing.setColor(color);
        clothing.setProductComposition(productComposition);
        clothing.setProductOverprint(productOverprint);
        clothing.setProductType(ProductType.CLOTHING);

        return clothing;
    }
}

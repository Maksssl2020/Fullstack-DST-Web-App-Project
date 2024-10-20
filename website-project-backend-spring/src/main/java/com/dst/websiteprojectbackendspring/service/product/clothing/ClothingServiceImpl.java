package com.dst.websiteprojectbackendspring.service.product.clothing;

import com.dst.websiteprojectbackendspring.dto.product.clothing.ClothingRequest;
import com.dst.websiteprojectbackendspring.mapper.ProductDTOMapper;
import com.dst.websiteprojectbackendspring.model.product.ProductType;
import com.dst.websiteprojectbackendspring.model.product.clothing.Clothing;
import com.dst.websiteprojectbackendspring.repository.ClothingRepository;
import com.dst.websiteprojectbackendspring.repository.ProductRepository;
import com.dst.websiteprojectbackendspring.service.product.ProductServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
public class ClothingServiceImpl extends ProductServiceImpl<Clothing> implements ClothingService {

    private final ClothingRepository clothingRepository;

    public ClothingServiceImpl(ProductRepository productRepository, ProductDTOMapper productDTOMapper, ClothingRepository clothingRepository) {
        super(productRepository, productDTOMapper, null);
        this.clothingRepository = clothingRepository;
    }

    @Override
    @Transactional
    public void saveClothing(ClothingRequest clothingRequest) {
        Clothing clothing = setClothing(clothingRequest);

        clothing.setImages(createImages(clothingRequest.getImages(), clothing));
        clothing.setCategories(createProductCategories(clothingRequest.getCategories(), clothing));
        clothing.setProductSize(createProductSizes(clothingRequest.getProductsSizes(), clothing));

        clothingRepository.save(clothing);
    }

    @Override
    public List<Clothing> findAllClothes() {
        return clothingRepository.findAll();
    }

    @Override
    public void updateClothing(Long id, ClothingRequest clothingRequest) {
        Clothing clothing = setClothing(clothingRequest);
        clothing.setId(id);

        clothing.setImages(createImages(clothingRequest.getImages(), clothing));
        clothing.setCategories(createProductCategories(clothingRequest.getCategories(), clothing));
        clothing.setProductSize(createProductSizes(clothingRequest.getProductsSizes(), clothing));

        clothingRepository.save(clothing);
    }

    public Clothing setClothing(ClothingRequest clothingRequest) {
        Clothing clothing = setProduct(new Clothing(), clothingRequest.getTitle(), clothingRequest.getName(), clothingRequest.getDescription(), clothingRequest.getPackageSize(), clothingRequest.getWeight(), clothingRequest.getPrice());
        clothing.setColor(clothingRequest.getColor());
        clothing.setProductComposition(clothingRequest.getProductComposition());
        clothing.setProductOverprint(clothingRequest.getProductOverprint());
        clothing.setProductType(ProductType.CLOTHING);

        return clothing;
    }
}

package com.dst.websiteprojectbackendspring.service.product.clothing;

import com.dst.websiteprojectbackendspring.dto.product.clothing.ClothingRequest;
import com.dst.websiteprojectbackendspring.model.product.clothing.Clothing;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ClothingService {

    void saveClothing(ClothingRequest clothingRequest);
    List<Clothing> findAllClothes();
    void updateClothing(Long id, ClothingRequest clothingRequest);
}

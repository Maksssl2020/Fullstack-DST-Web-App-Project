package com.dst.websiteprojectbackendspring.service.product.clothing;

import com.dst.websiteprojectbackendspring.model.product.clothing.Clothing;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface ClothingService {

    void saveClothing(
            String title, String name, String description, String packageSize,
            String weight, String price, List<String> categories, MultipartFile[] images,
            String color, String productComposition, String productOverprint, List<String> productsSizes
    );
    List<Clothing> findAllClothes();
    Clothing findClothingById(Long id);
    void updateClothing(Long id, Clothing clothing);
    void deleteClothingById(Long id);
}

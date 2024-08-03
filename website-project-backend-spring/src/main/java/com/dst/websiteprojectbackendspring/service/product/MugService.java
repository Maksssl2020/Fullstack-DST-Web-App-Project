package com.dst.websiteprojectbackendspring.service.product;

import com.dst.websiteprojectbackendspring.domain.product.mug.Mug;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MugService {

    void saveMug(
            String title, String name, String description, String packageSize,
            String weight, String price, List<String> categories, MultipartFile[] images,
            String color, String height, String material
    );
    List<Mug> findAllMugs();
    Mug findMugById(Long id);
    void updateMug(Long id, Mug clothing);
    void deleteMugById(Long id);
}

package com.dst.websiteprojectbackendspring.service.product;

import com.dst.websiteprojectbackendspring.domain.product.mug.Mug;
import com.dst.websiteprojectbackendspring.repository.MugRepository;
import com.dst.websiteprojectbackendspring.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class MugServiceImpl extends ProductServiceImpl<Mug> implements MugService {

    private final MugRepository mugRepository;

    public MugServiceImpl(ProductRepository productRepository, MugRepository mugRepository) {
        super(productRepository);
        this.mugRepository = mugRepository;
    }

    @Override
    public void saveMug(String title, String name, String description, String packageSize, String weight, String price, List<String> categories, MultipartFile[] images, String color, String height, String material) {
        Mug mug = setMug(title, name, description, packageSize, weight, price, color, height, material);
        mugRepository.save(mug);

        mug.setCategories(createProductCategories(categories, mug));
        mug.setImages(createImages(images, mug));

        mugRepository.save(mug);
    }

    @Override
    public List<Mug> findAllMugs() {
        return List.of();
    }

    @Override
    public Mug findMugById(Long id) {
        return null;
    }

    @Override
    public void updateMug(Long id, Mug clothing) {

    }

    @Override
    public void deleteMugById(Long id) {

    }

    private Mug setMug(
            String title, String name, String description, String packageSize,
            String weight, String price, String color, String height, String material
    ) {
        Mug mug = setProduct(new Mug(), title, name, description, packageSize, weight, price);
        mug.setColor(color);
        mug.setHeight(height);
        mug.setMaterial(material);

        return mug;
    }
}

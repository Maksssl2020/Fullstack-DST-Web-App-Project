package com.dst.websiteprojectbackendspring.service.product.pen;

import com.dst.websiteprojectbackendspring.model.product.ProductType;
import com.dst.websiteprojectbackendspring.model.product.pen.Pen;
import com.dst.websiteprojectbackendspring.dto.product.ProductDTOForCardMapper;
import com.dst.websiteprojectbackendspring.repository.PenRepository;
import com.dst.websiteprojectbackendspring.repository.ProductRepository;
import com.dst.websiteprojectbackendspring.service.product.ProductServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class PenServiceImpl extends ProductServiceImpl<Pen> implements PenService {

    private final PenRepository penRepository;

    public PenServiceImpl(ProductRepository productRepository, ProductDTOForCardMapper productDTOForCardMapper, PenRepository penRepository) {
        super(productRepository, productDTOForCardMapper);
        this.penRepository = penRepository;
    }


    @Override
    public void savePen(String title, String name, String description, String packageSize, String weight, String price, List<String> categories, MultipartFile[] images, String color, String inkColor) {
        Pen pen = setPen(title, name, description, packageSize, weight, price, color, inkColor);
        penRepository.save(pen);

        pen.setCategories(createProductCategories(categories, pen));
        pen.setImages(createImages(images, pen));

        penRepository.save(pen);
    }

    @Override
    public List<Pen> findAllPens() {
        return List.of();
    }

    @Override
    public Pen findPenById(Long id) {
        return null;
    }

    @Override
    public void updatePen(Long id, Pen pen) {

    }

    @Override
    public void deletePenById(Long id) {

    }

    private Pen setPen (
            String title, String name, String description, String packageSize,
            String weight, String price, String color, String inkColor) {
        Pen pen = setProduct(new Pen(), title, name, description, packageSize, weight, price);
        pen.setColor(color);
        pen.setInkColor(inkColor);
        pen.setProductType(ProductType.PEN);

        return pen;
    }
}

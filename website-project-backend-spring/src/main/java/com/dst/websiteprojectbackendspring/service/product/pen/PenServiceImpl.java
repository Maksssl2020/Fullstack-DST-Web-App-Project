package com.dst.websiteprojectbackendspring.service.product.pen;

import com.dst.websiteprojectbackendspring.dto.product.ProductDTOForCardMapper;
import com.dst.websiteprojectbackendspring.dto.product.clothing.PenRequest;
import com.dst.websiteprojectbackendspring.model.product.ProductType;
import com.dst.websiteprojectbackendspring.model.product.pen.Pen;
import com.dst.websiteprojectbackendspring.repository.PenRepository;
import com.dst.websiteprojectbackendspring.repository.ProductRepository;
import com.dst.websiteprojectbackendspring.service.product.ProductServiceImpl;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PenServiceImpl extends ProductServiceImpl<Pen> implements PenService {

    private final PenRepository penRepository;

    public PenServiceImpl(ProductRepository productRepository, ProductDTOForCardMapper productDTOForCardMapper, PenRepository penRepository) {
        super(productRepository, productDTOForCardMapper);
        this.penRepository = penRepository;
    }

    @Override
    public void savePen(PenRequest penRequest) {
        Pen pen = setPen(penRequest);

        pen.setCategories(createProductCategories(penRequest.getCategories(), pen));
        pen.setImages(createImages(penRequest.getImages(), pen));

        penRepository.save(pen);
    }

    @Override
    public List<Pen> findAllPens() {
        return List.of();
    }

    @Override
    public void updatePen(Long id, PenRequest penRequest) {
        Pen pen = setPen(penRequest);
        pen.setId(id);

        pen.setCategories(createProductCategories(penRequest.getCategories(), pen));
        pen.setImages(createImages(penRequest.getImages(), pen));

        penRepository.save(pen);
    }

    private Pen setPen (PenRequest penRequest) {
        Pen pen = setProduct(new Pen(), penRequest.getTitle(), penRequest.getName(), penRequest.getDescription(), penRequest.getPackageSize(), penRequest.getWeight(), penRequest.getPrice());
        pen.setColor(penRequest.getColor());
        pen.setInkColor(penRequest.getInkColor());
        pen.setProductType(ProductType.PEN);

        return pen;
    }
}

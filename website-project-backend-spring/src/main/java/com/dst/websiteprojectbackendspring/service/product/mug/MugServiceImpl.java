package com.dst.websiteprojectbackendspring.service.product.mug;

import com.dst.websiteprojectbackendspring.dto.product.mug.MugRequest;
import com.dst.websiteprojectbackendspring.mapper.ProductDTOMapper;
import com.dst.websiteprojectbackendspring.model.product.ProductType;
import com.dst.websiteprojectbackendspring.model.product.mug.Mug;
import com.dst.websiteprojectbackendspring.repository.MugRepository;
import com.dst.websiteprojectbackendspring.repository.ProductRepository;
import com.dst.websiteprojectbackendspring.service.product.ProductServiceImpl;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MugServiceImpl extends ProductServiceImpl<Mug> implements MugService {

    private final MugRepository mugRepository;

    public MugServiceImpl(ProductRepository productRepository, ProductDTOMapper productDTOMapper, MugRepository mugRepository) {
        super(productRepository, productDTOMapper, null);
        this.mugRepository = mugRepository;
    }

    @Override
    public void saveMug(MugRequest mugRequest) {
        Mug mug = setMug(mugRequest);

        mug.setCategories(createProductCategories(mugRequest.getCategories(), mug));
        mug.setImages(createImages(mugRequest.getImages(), mug));

        mugRepository.save(mug);
    }

    @Override
    public List<Mug> findAllMugs() {
        return List.of();
    }

    @Override
    public void updateMug(Long id, MugRequest mugRequest) {
        Mug mug = setMug(mugRequest);
        mug.setId(id);

        mug.setCategories(createProductCategories(mugRequest.getCategories(), mug));
        mug.setImages(createImages(mugRequest.getImages(), mug));

        mugRepository.save(mug);
    }

    private Mug setMug(MugRequest mugRequest) {
        Mug mug = setProduct(new Mug(), mugRequest.getTitle(), mugRequest.getName(), mugRequest.getDescription(), mugRequest.getPackageSize(), mugRequest.getWeight(), mugRequest.getPrice());
        mug.setColor(mugRequest.getColor());
        mug.setHeight(mugRequest.getHeight());
        mug.setMaterial(mugRequest.getMaterial());
        mug.setProductType(ProductType.MUG);

        return mug;
    }
}

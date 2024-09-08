package com.dst.websiteprojectbackendspring.service.product.gadget;

import com.dst.websiteprojectbackendspring.dto.product.ProductDTOForCardMapper;
import com.dst.websiteprojectbackendspring.dto.product.clothing.GadgetRequest;
import com.dst.websiteprojectbackendspring.model.product.ProductType;
import com.dst.websiteprojectbackendspring.model.product.gadget.Gadget;
import com.dst.websiteprojectbackendspring.repository.GadgetRepository;
import com.dst.websiteprojectbackendspring.repository.ProductRepository;
import com.dst.websiteprojectbackendspring.service.product.ProductServiceImpl;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GadgetServiceImpl extends ProductServiceImpl<Gadget> implements GadgetService {

    private final GadgetRepository gadgetRepository;

    public GadgetServiceImpl(ProductRepository productRepository, ProductDTOForCardMapper productDTOForCardMapper, GadgetRepository gadgetRepository) {
        super(productRepository, productDTOForCardMapper);
        this.gadgetRepository = gadgetRepository;
    }

    @Override
    public void saveGadget(GadgetRequest gadgetRequest) {
        Gadget gadget = setGadget(gadgetRequest);

        gadget.setCategories(createProductCategories(gadgetRequest.getCategories(), gadget));
        gadget.setImages(createImages(gadgetRequest.getImages(), gadget));

        gadgetRepository.save(gadget);
    }

    @Override
    public List<Gadget> findAllGadgets() {
        return List.of();
    }

    @Override
    public void updateGadget(Long id, GadgetRequest gadgetRequest) {
        Gadget gadget = setGadget(gadgetRequest);
        gadget.setId(id);

        gadget.setCategories(createProductCategories(gadgetRequest.getCategories(), gadget));
        gadget.setImages(createImages(gadgetRequest.getImages(), gadget));

        gadgetRepository.save(gadget);
    }

    private Gadget setGadget(GadgetRequest gadgetRequest) {
        Gadget gadget = setProduct(new Gadget(), gadgetRequest.getTitle(), gadgetRequest.toString(), gadgetRequest.getDescription(), gadgetRequest.getPackageSize(), gadgetRequest.getWeight(), gadgetRequest.getPrice());
        gadget.setType(gadgetRequest.getType());
        gadget.setMaterial(gadgetRequest.getMaterial());
        gadget.setProductType(ProductType.GADGET);

        return gadget;
    }
}

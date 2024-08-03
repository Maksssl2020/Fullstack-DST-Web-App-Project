package com.dst.websiteprojectbackendspring.service.product;

import com.dst.websiteprojectbackendspring.domain.product.gadget.Gadget;
import com.dst.websiteprojectbackendspring.domain.product.pen.Pen;
import com.dst.websiteprojectbackendspring.repository.GadgetRepository;
import com.dst.websiteprojectbackendspring.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class GadgetServiceImpl extends ProductServiceImpl<Gadget> implements GadgetService {

    private final GadgetRepository gadgetRepository;

    public GadgetServiceImpl(ProductRepository productRepository, GadgetRepository gadgetRepository) {
        super(productRepository);
        this.gadgetRepository = gadgetRepository;
    }

    @Override
    public void saveGadget(String title, String name, String description, String packageSize, String weight, String price, List<String> categories, MultipartFile[] images, String type, String material) {
        Gadget gadget = setGadget(title, name, description, packageSize, weight, price, type, material);
        gadgetRepository.save(gadget);

        gadget.setCategories(createProductCategories(categories, gadget));
        gadget.setImages(createImages(images, gadget));

        gadgetRepository.save(gadget);
    }

    @Override
    public List<Gadget> findAllGadgets() {
        return List.of();
    }

    @Override
    public Gadget findGadgetById(Long id) {
        return null;
    }

    @Override
    public void updateGadget(Long id, Pen pen) {

    }

    @Override
    public void deleteGadgetById(Long id) {

    }

    private Gadget setGadget(
            String title, String name, String description, String packageSize,
            String weight, String price, String type, String material
    ) {
        Gadget gadget = setProduct(new Gadget(), title, name, description, packageSize, weight, price);
        gadget.setType(type);
        gadget.setMaterial(material);

        return gadget;
    }
}

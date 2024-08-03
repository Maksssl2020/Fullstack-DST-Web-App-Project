package com.dst.websiteprojectbackendspring.service.product;


import com.dst.websiteprojectbackendspring.domain.product.gadget.Gadget;
import com.dst.websiteprojectbackendspring.domain.product.pen.Pen;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface GadgetService {

    void saveGadget(
            String title, String name, String description, String packageSize,
            String weight, String price, List<String> categories, MultipartFile[] images,
            String type, String material
    );
    List<Gadget> findAllGadgets();
    Gadget findGadgetById(Long id);
    void updateGadget(Long id, Pen pen);
    void deleteGadgetById(Long id);
}

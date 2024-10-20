package com.dst.websiteprojectbackendspring.service.product.gadget;


import com.dst.websiteprojectbackendspring.dto.product.gadget.GadgetRequest;
import com.dst.websiteprojectbackendspring.model.product.gadget.Gadget;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface GadgetService {

    void saveGadget(GadgetRequest gadgetRequest);
    List<Gadget> findAllGadgets();
    void updateGadget(Long id, GadgetRequest gadgetRequest);
}

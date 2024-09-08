package com.dst.websiteprojectbackendspring.service.product.mug;

import com.dst.websiteprojectbackendspring.dto.product.clothing.MugRequest;
import com.dst.websiteprojectbackendspring.model.product.mug.Mug;

import java.util.List;

public interface MugService {

    void saveMug(MugRequest mugRequest);
    List<Mug> findAllMugs();
    void updateMug(Long id, MugRequest mugRequest);
}

package com.dst.websiteprojectbackendspring.service.product.pen;

import com.dst.websiteprojectbackendspring.dto.product.clothing.PenRequest;
import com.dst.websiteprojectbackendspring.model.product.pen.Pen;

import java.util.List;

public interface PenService {

    void savePen(PenRequest penRequest);
    List<Pen> findAllPens();
    void updatePen(Long id, PenRequest penRequest);
}

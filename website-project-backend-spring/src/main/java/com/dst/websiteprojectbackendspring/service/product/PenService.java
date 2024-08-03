package com.dst.websiteprojectbackendspring.service.product;

import com.dst.websiteprojectbackendspring.domain.product.pen.Pen;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PenService {

    void savePen(
            String title, String name, String description, String packageSize,
            String weight, String price, List<String> categories, MultipartFile[] images,
            String color, String inkColor
    );
    List<Pen> findAllPens();
    Pen findPenById(Long id);
    void updatePen(Long id, Pen pen);
    void deletePenById(Long id);
}

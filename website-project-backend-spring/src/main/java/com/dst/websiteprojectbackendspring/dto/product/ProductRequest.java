package com.dst.websiteprojectbackendspring.dto.product;

import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Inheritance(strategy = InheritanceType.JOINED)
public class ProductRequest {

    private String title;
    private String name;
    private String description;
    private String packageSize;
    private String weight;
    private String price;
    private List<String> categories;
    private MultipartFile[] images;
}

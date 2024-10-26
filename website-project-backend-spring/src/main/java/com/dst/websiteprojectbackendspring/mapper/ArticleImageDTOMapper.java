package com.dst.websiteprojectbackendspring.mapper;

import com.dst.websiteprojectbackendspring.dto.article_image.ArticleImageDTO;
import com.dst.websiteprojectbackendspring.model.article_image.ArticleImage;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ArticleImageDTOMapper {

    private final ModelMapper modelMapper;

    public ArticleImageDTO mapArticleImageIntoArticleImageDTO(ArticleImage articleImage) {
        return modelMapper.map(articleImage, ArticleImageDTO.class);
    }
}

package com.dst.websiteprojectbackendspring.mapper;

import com.dst.websiteprojectbackendspring.dto.article.ArticleManagementDTO;
import com.dst.websiteprojectbackendspring.model.article.Article;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class ArticleDTOMapper {

    private final ModelMapper modelMapper;

    public ArticleManagementDTO mapArticleToArticleManagementDTO(Article article) {
        return modelMapper.map(article, ArticleManagementDTO.class);
    }
}

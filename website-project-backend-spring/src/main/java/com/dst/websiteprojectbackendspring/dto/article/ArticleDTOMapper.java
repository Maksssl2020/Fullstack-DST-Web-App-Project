package com.dst.websiteprojectbackendspring.dto.article;

import com.dst.websiteprojectbackendspring.model.article.Article;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class ArticleDTOMapper implements Function<Article, ArticleManagementDto> {

    @Override
    public ArticleManagementDto apply(Article article) {
        return new ArticleManagementDto(article.getId(), article.getTitle(), article.getAuthor(), article.getCreationDate());
    }
}

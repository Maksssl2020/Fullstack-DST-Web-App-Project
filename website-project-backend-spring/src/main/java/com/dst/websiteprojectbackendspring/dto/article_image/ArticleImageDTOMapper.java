package com.dst.websiteprojectbackendspring.dto.article_image;

import com.dst.websiteprojectbackendspring.model.article_image.ArticleImage;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class ArticleImageDTOMapper implements Function<ArticleImage, ArticleImageDTO> {

    @Override
    public ArticleImageDTO apply(ArticleImage articleImage) {
        return new ArticleImageDTO(articleImage.getId(), articleImage.getImageData());
    }
}

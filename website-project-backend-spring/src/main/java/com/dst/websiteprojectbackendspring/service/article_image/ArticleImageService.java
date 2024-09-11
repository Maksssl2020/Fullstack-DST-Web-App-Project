package com.dst.websiteprojectbackendspring.service.article_image;

import com.dst.websiteprojectbackendspring.dto.article_image.ArticleImageDTO;
import com.dst.websiteprojectbackendspring.model.article_image.ArticleImage;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ArticleImageService {

    void save(Long articleId, ArticleImage articleImage);
    List<ArticleImageDTO> findAllByArticleId(Long articleId);
}

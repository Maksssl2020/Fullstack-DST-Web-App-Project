package com.dst.websiteprojectbackendspring.service.article;

import com.dst.websiteprojectbackendspring.model.article.Article;
import com.dst.websiteprojectbackendspring.dto.article.ArticleRequest;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ArticleService {

    void save(ArticleRequest articleRequest);
    List<Article> findAll();
    Article findById(Long id) throws ChangeSetPersister.NotFoundException;
    void delete(Long id);
    void update(Long id, ArticleRequest articleRequest);
}

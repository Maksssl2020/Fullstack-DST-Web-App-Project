package com.dst.websiteprojectbackendspring.service.article;

import com.dst.websiteprojectbackendspring.model.article.Article;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@Service
public interface ArticleService {

    void save(String title, String content, String author, LocalDate creationDate, MultipartFile image);
    List<Article> findAll();
    Article findById(Long id) throws ChangeSetPersister.NotFoundException;
    void delete(Long id);
    void update(Long id, String title, String content, String author, LocalDate creationDate, MultipartFile image);
}

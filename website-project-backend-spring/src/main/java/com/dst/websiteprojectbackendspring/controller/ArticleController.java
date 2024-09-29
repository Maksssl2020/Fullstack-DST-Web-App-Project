package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.dto.article.ArticleManagementDto;
import com.dst.websiteprojectbackendspring.dto.article.ArticleRequest;
import com.dst.websiteprojectbackendspring.model.article.Article;
import com.dst.websiteprojectbackendspring.service.article.ArticleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    @GetMapping
    public ResponseEntity<List<ArticleManagementDto>> getAllArticles() {
        return ResponseEntity.ok(articleService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Article> getArticleById(@PathVariable Long id) throws ChangeSetPersister.NotFoundException {
        return ResponseEntity.ok(articleService.findById(id));
    }

    @PostMapping("/add-article")
    public ResponseEntity<HttpStatus> addArticle(@ModelAttribute ArticleRequest articleRequest) {
        articleService.save(articleRequest);
        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    @PutMapping("/update-article/{id}")
    public ResponseEntity<HttpStatus> updateArticle(@PathVariable Long id, @ModelAttribute ArticleRequest articleRequest) {
        articleService.update(id, articleRequest);
        return ResponseEntity.ok(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/delete-article/{id}")
    public ResponseEntity<HttpStatus> deleteArticle(@PathVariable Long id) {
        articleService.delete(id);
        return ResponseEntity.ok(HttpStatus.NO_CONTENT);
    }
}

package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.model.article.Article;
import com.dst.websiteprojectbackendspring.model.article.ArticleRequest;
import com.dst.websiteprojectbackendspring.service.article.ArticleServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleServiceImpl articleService;

    @GetMapping
    public ResponseEntity<List<Article>> getAllArticles() {
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
}

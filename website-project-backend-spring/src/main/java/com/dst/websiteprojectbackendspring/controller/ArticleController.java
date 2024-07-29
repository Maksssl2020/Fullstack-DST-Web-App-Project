package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.domain.article.Article;
import com.dst.websiteprojectbackendspring.service.article.ArticleServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
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
    public ResponseEntity<HttpStatus> addArticle(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("author") String author,
            @RequestParam("creationDate") LocalDate creationDate,
            @RequestParam(value = "image", required = false) MultipartFile image
            ) {
        articleService.save(title, content, author, creationDate, image);
        return ResponseEntity.ok(HttpStatus.CREATED);
    }
}

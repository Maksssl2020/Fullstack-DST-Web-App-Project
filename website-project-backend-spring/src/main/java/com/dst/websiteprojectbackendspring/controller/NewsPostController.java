package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.model.news_post.NewsPost;
import com.dst.websiteprojectbackendspring.service.news_post.NewsPostServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/news")
@RequiredArgsConstructor
public class NewsPostController {

    private final NewsPostServiceImpl newsPostServiceImpl;

    @GetMapping
    public ResponseEntity<Page<NewsPost>> getNews(@RequestParam int page, @RequestParam int size) {
        Page<NewsPost> pagePosts = newsPostServiceImpl.getNewsPosts(PageRequest.of(page, size, Sort.by("id").descending()));
        return ResponseEntity.ok(pagePosts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NewsPost> getNewsPost(@PathVariable Long id) throws ChangeSetPersister.NotFoundException {
        return ResponseEntity.ok(newsPostServiceImpl.getNewsPostById(id));
    }

    @PostMapping("/add-new-post")
    public ResponseEntity<HttpStatus> addNewPost(@RequestBody @Valid NewsPost newsPost) {
        newsPostServiceImpl.save(newsPost);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/edit-post/{id}")
    public ResponseEntity<HttpStatus> editNewsPost(@PathVariable Long id, @RequestParam String content) {
        newsPostServiceImpl.update(id, content);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/delete-post/{id}")
    public ResponseEntity<HttpStatus> deleteNewsPost(@PathVariable Long id) {
        newsPostServiceImpl.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

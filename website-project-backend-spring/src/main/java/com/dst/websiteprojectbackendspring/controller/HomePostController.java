package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.domain.home_post.HomePost;
import com.dst.websiteprojectbackendspring.service.home_post.HomePostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/home/posts")
@RequiredArgsConstructor
public class HomePostController {

    private static final Logger log = LoggerFactory.getLogger(HomePostController.class);
    private final HomePostService homePostService;

    @GetMapping
    public ResponseEntity<List<HomePost>> getHomePosts() {
        return ResponseEntity.ok(homePostService.findAll());
    }

    @GetMapping("/{postId}")
    public ResponseEntity<HomePost> getHomePost(@PathVariable Long postId) throws ChangeSetPersister.NotFoundException {
        return ResponseEntity.ok(homePostService.findById(postId));
    }

    @PostMapping("/add-post")
    public ResponseEntity<HttpStatus> addHomePost(
            @Valid @RequestParam("content") String content,
            @RequestParam("author") String author,
            @RequestParam("creationDate") String creationDate,
            @RequestParam("image") MultipartFile image
    ) {
        homePostService.save(content, author, creationDate, image);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/edit-post/{postId}")
    public ResponseEntity<HttpStatus> editHomePost(
            @PathVariable Long postId,
            @Valid @RequestParam("content") String content,
            @RequestParam("author") String author,
            @RequestParam("creationDate") String creationDate,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        System.out.println(image);
        homePostService.update(postId, content, author, creationDate, image);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/delete-post/{postId}")
    public ResponseEntity<HttpStatus> deleteHomePost(@PathVariable Long postId) {
        homePostService.delete(postId);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}

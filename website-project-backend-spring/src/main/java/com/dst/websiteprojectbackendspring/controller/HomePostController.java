package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.dto.home_post.HomePostRequest;
import com.dst.websiteprojectbackendspring.model.home_post.HomePost;
import com.dst.websiteprojectbackendspring.service.home_post.HomePostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/home/posts")
@RequiredArgsConstructor
public class HomePostController {

    private final HomePostService homePostService;

    @GetMapping
    public ResponseEntity<List<HomePost>> getHomePosts() {
        return ResponseEntity.ok(homePostService.findAll());
    }

    @GetMapping("/{postId}")
    public ResponseEntity<HomePost> getHomePost(@PathVariable Long postId) throws ChangeSetPersister.NotFoundException {
        return ResponseEntity.ok(homePostService.findById(postId));
    }

    @PutMapping("/edit-post/{postId}")
    public ResponseEntity<HttpStatus> editHomePost(@PathVariable Long postId, @ModelAttribute HomePostRequest homePostRequest) {
        homePostService.update(postId, homePostRequest);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/delete-post/{postId}")
    public ResponseEntity<HttpStatus> deleteHomePost(@PathVariable Long postId) {
        homePostService.delete(postId);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}

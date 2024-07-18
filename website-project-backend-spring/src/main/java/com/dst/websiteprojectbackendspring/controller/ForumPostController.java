package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.forum_post.ForumPost;
import com.dst.websiteprojectbackendspring.service.ForumPostServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/forum")
@RequiredArgsConstructor
public class ForumPostController {

    private final ForumPostServiceImpl forumPostServiceImpl;

    @GetMapping("/")
    public ResponseEntity<List<ForumPost>> getAllPosts() {
        return ResponseEntity.ok(forumPostServiceImpl.getForumPosts());
    }

    @GetMapping("/create-post")
    public ResponseEntity<Long> countByAuthor(@RequestBody String author) {
        return ResponseEntity.ok(forumPostServiceImpl.countByAuthor(author));
    }

    @PostMapping("/create-post")
    public ResponseEntity<HttpStatus> createPost(@RequestBody @Valid ForumPost forumPost) {
        forumPostServiceImpl.saveForumPost(forumPost);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}

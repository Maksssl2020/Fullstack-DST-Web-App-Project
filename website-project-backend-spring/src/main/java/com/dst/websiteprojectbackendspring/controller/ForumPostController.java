package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.domain.forum_post.ForumPost;
import com.dst.websiteprojectbackendspring.service.forum_post.ForumPostServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/forum")
@RequiredArgsConstructor
public class ForumPostController {

    private final ForumPostServiceImpl forumPostServiceImpl;

    @GetMapping("/posts")
    public ResponseEntity<Page<ForumPost>> getAllPosts(@RequestParam int page, @RequestParam int size) {
        Page<ForumPost> forumPosts = forumPostServiceImpl.getForumPosts(PageRequest.of(page, size, Sort.by("id").descending()));
        return ResponseEntity.ok(forumPosts);
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

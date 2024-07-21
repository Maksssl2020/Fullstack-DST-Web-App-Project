package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.domain.forum_post.ForumPost;
import com.dst.websiteprojectbackendspring.service.forum_post.ForumPostServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/forum")
@RequiredArgsConstructor
@Log4j2
public class ForumPostController {

    private final ForumPostServiceImpl forumPostServiceImpl;

    @GetMapping("/posts")
    public ResponseEntity<Page<ForumPost>> getAllPosts(@RequestParam int page, @RequestParam int size) {
        Page<ForumPost> forumPosts = forumPostServiceImpl.getForumPosts(PageRequest.of(page, size, Sort.by("id").descending()));
        return ResponseEntity.ok(forumPosts);
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<ForumPost> getPost(@PathVariable Long id) throws ChangeSetPersister.NotFoundException {
        return ResponseEntity.ok(forumPostServiceImpl.getForumPostById(id));
    }

    @GetMapping("/posts/author/{author}")
    public ResponseEntity<Long> countByAuthor(@PathVariable String author) {
        return ResponseEntity.ok(forumPostServiceImpl.countByAuthor(author));
    }

    @PostMapping("/create-post")
    public ResponseEntity<HttpStatus> createPost(@RequestBody @Valid ForumPost forumPost) {
        forumPostServiceImpl.saveForumPost(forumPost);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/posts/edit-post/{id}")
    public ResponseEntity<HttpStatus> editPost(@PathVariable Long id, @RequestBody @Valid ForumPost forumPost) {
        forumPostServiceImpl.update(id, forumPost);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/posts/delete-post/{id}")
    public ResponseEntity<HttpStatus> deletePost(@PathVariable Long id) throws ChangeSetPersister.NotFoundException {
        log.info("Deleting post with id {}", id);
        forumPostServiceImpl.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

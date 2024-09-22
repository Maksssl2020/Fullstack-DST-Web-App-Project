package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.dto.forum_post.ForumPostDTO;
import com.dst.websiteprojectbackendspring.dto.forum_post.ForumPostRequest;
import com.dst.websiteprojectbackendspring.service.forum_post.ForumPostService;
import lombok.RequiredArgsConstructor;
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
public class ForumPostController {

    private final ForumPostService forumPostService;

    @GetMapping("/posts")
    public ResponseEntity<Page<ForumPostDTO>> getAllPosts(@RequestParam int page, @RequestParam int size) {
        Page<ForumPostDTO> forumPosts = forumPostService.getForumPosts(PageRequest.of(page, size, Sort.by("id").descending()));
        return ResponseEntity.ok(forumPosts);
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<ForumPostDTO> getPost(@PathVariable Long id) throws ChangeSetPersister.NotFoundException {
        return ResponseEntity.ok(forumPostService.getForumPostById(id));
    }

    @GetMapping("/posts/author/{authorId}")
    public ResponseEntity<Long> countByAuthor(@PathVariable Long authorId) {
        return ResponseEntity.ok(forumPostService.countByAuthor(authorId));
    }

    @PostMapping("/create-post")
    public ResponseEntity<HttpStatus> createPost(@RequestBody ForumPostRequest forumPostRequest) {
        forumPostService.saveForumPost(forumPostRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/posts/edit-post/{id}")
    public ResponseEntity<HttpStatus> editPost(@PathVariable Long id, @RequestBody ForumPostRequest forumPost) {
        forumPostService.update(id, forumPost);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/posts/delete-post/{id}")
    public ResponseEntity<HttpStatus> deletePost(@PathVariable Long id) throws ChangeSetPersister.NotFoundException {
        forumPostService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

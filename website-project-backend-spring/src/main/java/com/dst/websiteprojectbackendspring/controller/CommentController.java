package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.domain.comment.Comment;
import com.dst.websiteprojectbackendspring.service.comment.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<Comment>> getCommentsByPostId(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getCommentsByPostId(postId));
    }

    @GetMapping("/post/{postId}/amount-of-comments")
    public ResponseEntity<Long> countCommentsByPostId(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.countCommentsByPostId(postId));
    }

    @PostMapping("/post/{postId}/add-comment")
    public ResponseEntity<HttpStatus> addComment(@PathVariable Long postId, @RequestBody @Valid Comment comment) throws ChangeSetPersister.NotFoundException {
        commentService.saveComment(comment, postId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}

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

    @PutMapping("/post/{postId}/edit-comment/{commentId}")
    public ResponseEntity<HttpStatus> updateComment(@PathVariable Long postId,@PathVariable Long commentId, @RequestBody @Valid Comment comment) throws ChangeSetPersister.NotFoundException {
        commentService.updateComment(postId, commentId, comment);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/post/{postId}/delete-comment/{commentId}")
    public ResponseEntity<HttpStatus> deleteComment(@PathVariable Long postId, @PathVariable Long commentId) throws ChangeSetPersister.NotFoundException {
        commentService.deleteComment(postId, commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

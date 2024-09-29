package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.dto.comment.CommentDTO;
import com.dst.websiteprojectbackendspring.dto.comment.CommentRequest;
import com.dst.websiteprojectbackendspring.dto.comment.CommentUpdateRequest;
import com.dst.websiteprojectbackendspring.service.comment.CommentService;
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
    public ResponseEntity<List<CommentDTO>> getCommentsByPostId(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getCommentsByPostId(postId));
    }

    @GetMapping("/post/{postId}/amount-of-comments")
    public ResponseEntity<Long> countCommentsByPostId(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.countCommentsByPostId(postId));
    }

    @PostMapping("/post/{postId}/add-comment")
    public ResponseEntity<HttpStatus> addComment(@PathVariable Long postId, @RequestBody CommentRequest commentRequest) throws ChangeSetPersister.NotFoundException {
        commentService.saveComment(commentRequest, postId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/post/{postId}/edit-comment/{commentId}")
    public ResponseEntity<HttpStatus> updateComment(@PathVariable Long postId,@PathVariable Long commentId, @RequestBody CommentUpdateRequest commentUpdateRequest) throws ChangeSetPersister.NotFoundException {
        commentService.updateComment(postId, commentId, commentUpdateRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/delete-comment/{commentId}")
    public ResponseEntity<HttpStatus> deleteComment(@PathVariable Long commentId) throws ChangeSetPersister.NotFoundException {
        commentService.deleteComment(commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

package com.dst.websiteprojectbackendspring.service.comment;

import com.dst.websiteprojectbackendspring.model.comment.Comment;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.util.List;

public interface CommentService {
    void saveComment(Comment comment, Long postId) throws ChangeSetPersister.NotFoundException;
    List<Comment> getCommentsByPostId(Long postId);
    Long countCommentsByPostId(Long postId);
    void updateComment(Long postId, Long commentId, Comment comment) throws ChangeSetPersister.NotFoundException;
    void deleteComment(Long postId, Long commentId) throws ChangeSetPersister.NotFoundException;
}

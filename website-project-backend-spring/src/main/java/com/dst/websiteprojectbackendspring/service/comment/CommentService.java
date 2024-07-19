package com.dst.websiteprojectbackendspring.service.comment;

import com.dst.websiteprojectbackendspring.domain.comment.Comment;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.util.List;

public interface CommentService {
    void saveComment(Comment comment, Long postId) throws ChangeSetPersister.NotFoundException;
    List<Comment> getCommentsByPostId(Long postId);
    Long countCommentsByPostId(Long postId);
}

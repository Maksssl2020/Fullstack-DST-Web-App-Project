package com.dst.websiteprojectbackendspring.service.comment;

import com.dst.websiteprojectbackendspring.dto.comment.CommentDTO;
import com.dst.websiteprojectbackendspring.dto.comment.CommentRequest;
import com.dst.websiteprojectbackendspring.dto.comment.CommentUpdateRequest;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.util.List;

public interface CommentService {
    void saveComment(CommentRequest commentRequest, Long postId) throws ChangeSetPersister.NotFoundException;
    List<CommentDTO> getCommentsByPostId(Long postId);
    Long countCommentsByPostId(Long postId);
    void updateComment(Long postId, Long commentId, CommentUpdateRequest commentUpdateRequest) throws ChangeSetPersister.NotFoundException;
    void deleteComment(Long commentId) throws ChangeSetPersister.NotFoundException;
}

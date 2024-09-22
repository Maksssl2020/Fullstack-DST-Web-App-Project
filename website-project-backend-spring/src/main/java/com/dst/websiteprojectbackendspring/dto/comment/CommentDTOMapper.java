package com.dst.websiteprojectbackendspring.dto.comment;

import com.dst.websiteprojectbackendspring.model.comment.Comment;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class CommentDTOMapper implements Function<Comment, CommentDTO> {
    @Override
    public CommentDTO apply(Comment comment) {
        return new CommentDTO(comment.getId(), comment.getContent(), comment.getCreationDate(), comment.getForumPost().getId(), comment.getUser().getId());
    }
}

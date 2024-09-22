package com.dst.websiteprojectbackendspring.dto.comment;

import java.time.LocalDateTime;

public record CommentDTO(Long id, String content, LocalDateTime creationDate, Long postId, Long authorId) {
}

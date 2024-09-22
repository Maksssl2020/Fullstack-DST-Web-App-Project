package com.dst.websiteprojectbackendspring.dto.comment;

public record CommentRequest(Long postId, String content, Long authorId) {
}

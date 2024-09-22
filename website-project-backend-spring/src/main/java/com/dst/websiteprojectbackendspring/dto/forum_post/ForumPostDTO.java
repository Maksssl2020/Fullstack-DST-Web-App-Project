package com.dst.websiteprojectbackendspring.dto.forum_post;

import java.time.LocalDateTime;

public record ForumPostDTO(Long id, String title, String content, String postType, LocalDateTime creationDate, Long authorId) {
}

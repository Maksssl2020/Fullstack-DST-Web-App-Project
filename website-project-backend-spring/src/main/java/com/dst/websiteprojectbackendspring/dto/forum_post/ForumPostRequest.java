package com.dst.websiteprojectbackendspring.dto.forum_post;

public record ForumPostRequest(String title, String content, String postType, Long authorId) {
}
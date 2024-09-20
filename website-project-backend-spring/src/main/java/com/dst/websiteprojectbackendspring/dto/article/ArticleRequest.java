package com.dst.websiteprojectbackendspring.dto.article;

import jakarta.annotation.Nullable;
import org.springframework.web.multipart.MultipartFile;

public record ArticleRequest(String title, String content, String author, @Nullable String socialMediaLinksJson, MultipartFile[] images) {
}
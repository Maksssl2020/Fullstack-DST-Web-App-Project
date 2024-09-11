package com.dst.websiteprojectbackendspring.model.article;

import org.springframework.web.multipart.MultipartFile;

public record ArticleRequest(String title, String content, String author,  MultipartFile[] images) {
}
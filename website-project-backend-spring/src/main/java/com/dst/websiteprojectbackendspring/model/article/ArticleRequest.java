package com.dst.websiteprojectbackendspring.model.article;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

public record ArticleRequest(String title, String content, String author, @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate creationDate, MultipartFile[] images) {
}
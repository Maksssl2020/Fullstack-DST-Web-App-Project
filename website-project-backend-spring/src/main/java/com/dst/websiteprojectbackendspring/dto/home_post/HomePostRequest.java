package com.dst.websiteprojectbackendspring.dto.home_post;

import org.springframework.web.multipart.MultipartFile;

public record HomePostRequest(String content, MultipartFile image) { }
package com.dst.websiteprojectbackendspring.dto.article;

import java.time.LocalDate;

public record ArticleManagementDto(Long id, String title, String author, LocalDate creationDate) {

}

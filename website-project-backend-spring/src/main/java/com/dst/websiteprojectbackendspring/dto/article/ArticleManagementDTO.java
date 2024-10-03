package com.dst.websiteprojectbackendspring.dto.article;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ArticleManagementDTO {
    private Long id;
    private String title;
    private String author;
    private LocalDate creationDate;
}

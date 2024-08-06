package com.dst.websiteprojectbackendspring.model.news_post;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "news_posts")
public class NewsPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "Content cannot be empty!")
    @NotBlank(message = "Content cannot be blank!")
    private String content;

    private String author;

    @JsonFormat(pattern = "dd.MM.yyyy")
    private LocalDate creationDate;

    private Long mainArticleId;
}

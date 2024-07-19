package com.dst.websiteprojectbackendspring.domain.forum_post;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "forum_posts")
@Builder
public class ForumPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "Title cannot be blank!")
    @NotBlank(message = "Title cannot be empty!")
    @Size(min = 5, message = "Title must be 5 characters minimum!")
    private String title;

    @NotBlank(message = "Content cannot be blank!")
    @NotEmpty(message = "Content cannot be empty!")
    @Size(min = 25, message = "Content must be 25 characters minimum!")
    private String content;

    private String author;
    private String authorRole;

    @JsonFormat(pattern = "dd.MM.yyyy")
    private LocalDate creationDate;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "post_type")
    private PostType postType;
}

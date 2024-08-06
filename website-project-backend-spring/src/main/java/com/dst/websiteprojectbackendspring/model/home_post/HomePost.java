package com.dst.websiteprojectbackendspring.model.home_post;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.deser.std.NumberDeserializers;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "home_posts")
public class HomePost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "Content cannot be empty!")
    @NotBlank(message = "Content cannot be blank!")
    @Column(length = 1000)
    private String content;

    private String author;

    @JsonFormat(pattern = "dd.MM.yyyy")
    private LocalDate creationDate;

    @Lob
    @JsonDeserialize(using = NumberDeserializers.ByteDeserializer.class)
    @NotNull(message = "Image cannot be null!")
    private byte[] image;

    private Long mainArticleId;
}

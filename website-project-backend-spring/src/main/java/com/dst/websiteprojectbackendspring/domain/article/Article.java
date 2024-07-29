package com.dst.websiteprojectbackendspring.domain.article;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.deser.std.NumberDeserializers;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "articles")
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 10000)
    private String content;
    private String author;

    @JsonFormat(pattern = "dd.MM.yyyy")
    private LocalDate creationDate;

    @Lob
    @JsonDeserialize(using = NumberDeserializers.ByteDeserializer.class)
    private byte[] image;
}

package com.dst.websiteprojectbackendspring.model.social_media_link;

import com.dst.websiteprojectbackendspring.model.article.Article;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "social-media-links")
public class SocialMediaLink {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String socialMediaName;
    private String url;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "article_id")
    private Article article;
}

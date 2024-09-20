package com.dst.websiteprojectbackendspring.model.article_image;

import com.dst.websiteprojectbackendspring.model.article.Article;
import com.dst.websiteprojectbackendspring.model.image.Image;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ArticleImage extends Image {

    @JsonBackReference
    @ManyToOne(optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "article_id", referencedColumnName = "id")
    private Article article;
}

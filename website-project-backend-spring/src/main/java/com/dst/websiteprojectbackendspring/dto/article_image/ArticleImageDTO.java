package com.dst.websiteprojectbackendspring.dto.article_image;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ArticleImageDTO {
    private Long id;
    private byte[] image;
}

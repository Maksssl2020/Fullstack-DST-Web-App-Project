package com.dst.websiteprojectbackendspring.dto.forum_post;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ForumPostDTO {
    private Long id;
    private String title;
    private String content;
    private String postType;
    private LocalDateTime creationDate;
    private Long authorId;
}

package com.dst.websiteprojectbackendspring.dto.comment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CommentDTO {
    private Long id;
    private String content;
    private LocalDateTime creationDate;
    private Long postId;
    private Long authorId;
}

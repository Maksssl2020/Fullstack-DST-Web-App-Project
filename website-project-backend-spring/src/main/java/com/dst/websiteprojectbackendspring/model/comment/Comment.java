package com.dst.websiteprojectbackendspring.model.comment;

import com.dst.websiteprojectbackendspring.model.forum_post.ForumPost;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Content cannot be blank!")
    @NotEmpty(message = "Content cannot be empty!")
    private String content;

    private String author;
    private String authorRole;
    private LocalDateTime creationDate;

    @ManyToOne(optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "post_id", referencedColumnName = "id")
    private ForumPost forumPost;
}

package com.dst.websiteprojectbackendspring.model.forum_post;

import com.dst.websiteprojectbackendspring.model.comment.Comment;
import com.dst.websiteprojectbackendspring.model.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    @Column(length = 500)
    private String content;

    private LocalDateTime creationDate;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "post_type")
    private PostType postType;

    @JsonBackReference
    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User author;

    @JsonManagedReference
    @OneToMany(mappedBy = "forumPost", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();
}

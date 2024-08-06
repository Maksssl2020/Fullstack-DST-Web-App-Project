package com.dst.websiteprojectbackendspring.repository;

import com.dst.websiteprojectbackendspring.model.comment.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByForumPostId(Long postId);
    Long countByForumPostId(Long forumPostId);
}

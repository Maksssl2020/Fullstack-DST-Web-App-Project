package com.dst.websiteprojectbackendspring.repository;

import com.dst.websiteprojectbackendspring.domain.forum_post.ForumPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForumPostRepository extends JpaRepository<ForumPost, Long> {

    Long countByAuthor(String author);
}

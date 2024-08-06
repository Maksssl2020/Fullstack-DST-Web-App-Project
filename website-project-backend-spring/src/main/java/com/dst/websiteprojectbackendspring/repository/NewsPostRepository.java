package com.dst.websiteprojectbackendspring.repository;

import com.dst.websiteprojectbackendspring.model.news_post.NewsPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsPostRepository extends JpaRepository<NewsPost, Long> {
    boolean existsById(Long id);
}

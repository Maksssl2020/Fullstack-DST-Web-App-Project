package com.dst.websiteprojectbackendspring.repository;

import com.dst.websiteprojectbackendspring.domain.home_post.HomePost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HomePostRepository extends JpaRepository<HomePost, Long> {
}

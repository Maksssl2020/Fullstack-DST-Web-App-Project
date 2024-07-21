package com.dst.websiteprojectbackendspring.service.news_post;

import com.dst.websiteprojectbackendspring.domain.news_post.NewsPost;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface NewsPostService {

    void save(NewsPost newsPost);
    List<NewsPost> findAll();
    NewsPost getNewsPostById(Long id) throws ChangeSetPersister.NotFoundException;
    Page<NewsPost> getNewsPosts(PageRequest pageRequest);
    void update(Long id, NewsPost newsPost);
    void delete(Long id);
}

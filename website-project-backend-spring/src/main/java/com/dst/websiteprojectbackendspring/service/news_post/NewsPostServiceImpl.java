package com.dst.websiteprojectbackendspring.service.news_post;

import com.dst.websiteprojectbackendspring.domain.news_post.NewsPost;
import com.dst.websiteprojectbackendspring.repository.NewsPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NewsPostServiceImpl implements NewsPostService {

    private final NewsPostRepository newsPostRepository;

    @Override
    public void save(NewsPost newsPost) {
        LocalDate today = LocalDate.now();
        newsPostRepository.save(newsPost);
    }

    @Override
    public List<NewsPost> findAll() {
        return newsPostRepository.findAll();
    }

    @Override
    public Page<NewsPost> getNewsPosts(PageRequest pageRequest) {
        Page<NewsPost> allPosts = newsPostRepository.findAll(pageRequest);
        List<NewsPost> posts = allPosts.stream().toList();

        return new PageImpl<NewsPost>(posts, pageRequest, allPosts.getTotalElements());
    }
}

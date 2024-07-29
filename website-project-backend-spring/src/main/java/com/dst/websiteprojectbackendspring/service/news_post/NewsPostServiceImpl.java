package com.dst.websiteprojectbackendspring.service.news_post;

import com.dst.websiteprojectbackendspring.domain.news_post.NewsPost;
import com.dst.websiteprojectbackendspring.repository.NewsPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NewsPostServiceImpl implements NewsPostService {

    private final NewsPostRepository newsPostRepository;

    @Override
    public void save(NewsPost newsPost) {
        newsPostRepository.save(newsPost);
    }

    @Override
    public List<NewsPost> findAll() {
        return newsPostRepository.findAll();
    }

    @Override
    public NewsPost getNewsPostById(Long id) throws ChangeSetPersister.NotFoundException {
        return newsPostRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
    }

    @Override
    public Page<NewsPost> getNewsPosts(PageRequest pageRequest) {
        Page<NewsPost> allPosts = newsPostRepository.findAll(pageRequest);
        List<NewsPost> posts = allPosts.stream().toList();

        return new PageImpl<>(posts, pageRequest, allPosts.getTotalElements());
    }

    @Override
    public void update(Long id, NewsPost newsPost) {
        if (newsPostRepository.existsById(id)) {
            newsPost.setId(id);
            newsPostRepository.save(newsPost);
        }
    }

    @Override
    public void delete(Long id) {
        newsPostRepository.deleteById(id);
    }
}

package com.dst.websiteprojectbackendspring.service.news_post;

import com.dst.websiteprojectbackendspring.model.news_post.NewsPost;
import com.dst.websiteprojectbackendspring.repository.NewsPostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
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
    public void update(Long id, String content) {
        try {
            NewsPost foundNewsPost = newsPostRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
            foundNewsPost.setContent(content);
            foundNewsPost.setId(id);
            newsPostRepository.save(foundNewsPost);
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void delete(Long id) {
        newsPostRepository.deleteById(id);
    }

    @Override
    public void deleteByMainArticleId(Long mainArticleId) {
        log.error("DELETING!");
        newsPostRepository.deleteByMainArticleId(mainArticleId);
    }
}

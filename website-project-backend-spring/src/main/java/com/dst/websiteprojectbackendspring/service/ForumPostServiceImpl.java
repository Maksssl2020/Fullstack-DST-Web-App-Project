package com.dst.websiteprojectbackendspring.service;

import com.dst.websiteprojectbackendspring.forum_post.ForumPost;
import com.dst.websiteprojectbackendspring.repository.ForumPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ForumPostServiceImpl implements ForumPostService {

    private final ForumPostRepository forumPostRepository;

    public void saveForumPost(ForumPost forumPost) {
        forumPostRepository.save(forumPost);
    }

    public List<ForumPost> getForumPosts() {
        return forumPostRepository.findAll();
    }

    public Long countByAuthor(String author) {
        return forumPostRepository.countByAuthor(author);
    }
}

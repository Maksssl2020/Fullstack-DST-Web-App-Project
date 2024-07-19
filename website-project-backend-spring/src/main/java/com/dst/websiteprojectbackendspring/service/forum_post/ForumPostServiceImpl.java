package com.dst.websiteprojectbackendspring.service.forum_post;

import com.dst.websiteprojectbackendspring.domain.forum_post.ForumPost;
import com.dst.websiteprojectbackendspring.repository.ForumPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ForumPostServiceImpl implements ForumPostService {

    private final ForumPostRepository forumPostRepository;

    public void saveForumPost(ForumPost forumPost) {
        forumPostRepository.save(forumPost);
    }

    public List<ForumPost> getForumPosts() {
        List<ForumPost> allPosts = forumPostRepository.findAll();
        return allPosts.stream().sorted(Comparator.comparing(ForumPost::getId).reversed()).toList();
    }

    public Page<ForumPost> getForumPosts(PageRequest pageRequest) {
        Page<ForumPost> allPosts = forumPostRepository.findAll(pageRequest);
        List<ForumPost> sortedPosts = allPosts.stream()
                .collect(Collectors.toList());
        System.out.println(allPosts);
        System.out.println(sortedPosts.size());

        return new PageImpl<>(sortedPosts, pageRequest, allPosts.getTotalElements());
    }

    public Long countByAuthor(String author) {
        return forumPostRepository.countByAuthor(author);
    }
}

package com.dst.websiteprojectbackendspring.service.forum_post;

import com.dst.websiteprojectbackendspring.domain.forum_post.ForumPost;
import com.dst.websiteprojectbackendspring.repository.CommentRepository;
import com.dst.websiteprojectbackendspring.repository.ForumPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ForumPostServiceImpl implements ForumPostService {

    private final ForumPostRepository forumPostRepository;
    private final CommentRepository commentRepository;

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


        return new PageImpl<>(sortedPosts, pageRequest, allPosts.getTotalElements());
    }

    @Override
    public ForumPost getForumPostById(Long id) throws ChangeSetPersister.NotFoundException {
        return forumPostRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
    }

    public Long countByAuthor(String author) {
        return forumPostRepository.countByAuthor(author);
    }

    @Override
    public void update(Long id, ForumPost forumPost) {
        if (forumPostRepository.existsById(id)) {
            forumPost.setId(id);
            forumPost.getComments().clear();
            forumPost.getComments().addAll(commentRepository.findByForumPostId(id));
            forumPostRepository.save(forumPost);
        }
    }

    @Override
    @Transactional
    public void delete(Long id) throws ChangeSetPersister.NotFoundException {
        ForumPost forumPost = forumPostRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
        forumPost.getComments().clear();
        forumPostRepository.deleteById(id);
    }
}

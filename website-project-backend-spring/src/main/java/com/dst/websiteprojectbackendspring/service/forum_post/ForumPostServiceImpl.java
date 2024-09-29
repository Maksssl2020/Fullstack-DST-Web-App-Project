package com.dst.websiteprojectbackendspring.service.forum_post;

import com.dst.websiteprojectbackendspring.dto.forum_post.ForumPostDTO;
import com.dst.websiteprojectbackendspring.dto.forum_post.ForumPostDTOMapper;
import com.dst.websiteprojectbackendspring.dto.forum_post.ForumPostRequest;
import com.dst.websiteprojectbackendspring.model.forum_post.ForumPost;
import com.dst.websiteprojectbackendspring.model.forum_post.PostType;
import com.dst.websiteprojectbackendspring.model.user.User;
import com.dst.websiteprojectbackendspring.repository.CommentRepository;
import com.dst.websiteprojectbackendspring.repository.ForumPostRepository;
import com.dst.websiteprojectbackendspring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ForumPostServiceImpl implements ForumPostService {

    private final ForumPostRepository forumPostRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final ForumPostDTOMapper forumPostDTOMapper;

    public void saveForumPost(ForumPostRequest forumPostRequest) {
        ForumPost forumPost = setForumPost(forumPostRequest);
        forumPostRepository.save(forumPost);
    }

    public List<ForumPostDTO> getForumPosts() {
        List<ForumPost> allPosts = forumPostRepository.findAll();

        return allPosts.stream().map(forumPostDTOMapper).sorted(Comparator.comparing(ForumPostDTO::id).reversed()).toList();
    }

    public Page<ForumPostDTO> getForumPosts(PageRequest pageRequest) {
        Page<ForumPost> allPosts = forumPostRepository.findAll(pageRequest);
        List<ForumPostDTO> sortedPosts = allPosts.stream()
                .map(forumPostDTOMapper)
                .sorted(Comparator.comparing(ForumPostDTO::id).reversed())
                .collect(Collectors.toList());


        return new PageImpl<>(sortedPosts, pageRequest, allPosts.getTotalElements());
    }

    @Override
    public ForumPostDTO getForumPostById(Long id) throws ChangeSetPersister.NotFoundException {
        return forumPostRepository.findById(id).map(forumPostDTOMapper).orElseThrow(ChangeSetPersister.NotFoundException::new);
    }

    public Long countByAuthor(Long authorId) {
        return forumPostRepository.countByAuthorId(authorId);
    }

    @Override
    public void update(Long id, ForumPostRequest forumPostRequest) {
        try {
            ForumPost foundForumPost = forumPostRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
            foundForumPost.setId(id);
            foundForumPost.setTitle(forumPostRequest.title());
            foundForumPost.setContent(forumPostRequest.content());
            foundForumPost.setPostType(PostType.valueOf(forumPostRequest.postType().toUpperCase()));
            foundForumPost.getComments().clear();
            foundForumPost.getComments().addAll(commentRepository.findByForumPostId(id));

            forumPostRepository.save(foundForumPost);
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public void delete(Long id) throws ChangeSetPersister.NotFoundException {
        ForumPost forumPost = forumPostRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
        forumPost.getComments().clear();
        forumPostRepository.deleteById(id);
    }

    private ForumPost setForumPost(ForumPostRequest forumPostRequest) {
        try {
            ForumPost forumPost = new ForumPost();
            User foundUser = userRepository.findById(forumPostRequest.authorId()).orElseThrow(ChangeSetPersister.NotFoundException::new);
            forumPost.setTitle(forumPostRequest.title());
            forumPost.setContent(forumPostRequest.content());
            forumPost.setPostType(PostType.valueOf(forumPostRequest.postType().toUpperCase()));
            forumPost.setAuthor(foundUser);
            forumPost.setCreationDate(LocalDateTime.now());

            return forumPost;
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }

    }
}

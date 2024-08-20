package com.dst.websiteprojectbackendspring.service.forum_post;

import com.dst.websiteprojectbackendspring.model.forum_post.ForumPost;
import com.dst.websiteprojectbackendspring.model.forum_post.PostType;
import com.dst.websiteprojectbackendspring.repository.ForumPostRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ForumPostServiceImplTest {

    @Mock
    private ForumPostRepository forumPostRepository;

    @InjectMocks
    private ForumPostServiceImpl forumPostService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @Disabled
    void testGettingAllForumPost() {
        List<ForumPost> forumPosts = new ArrayList<>();
        forumPosts.add(
                ForumPost.builder()
                .title("title")
                .content("content")
                .authorRole("ADMIN")
                .creationDate(LocalDate.now())
                .postType(PostType.PUBLIC)
                .build()
        );

        when(forumPostRepository.findAll()).thenReturn(forumPosts);
        when(forumPostRepository.saveAll(forumPosts)).thenReturn(forumPosts);

        List<ForumPost> forumPosts1 = forumPostService.getForumPosts();
        assertEquals(forumPosts.size(), forumPosts1.size());
    }

    @Test
    @Disabled
    void testSaveOneForumPost() {
        ForumPost forumPost = ForumPost.builder()
                .title("title")
                .content("content")
                .authorRole("ADMIN")
                .creationDate(LocalDate.now())
                .postType(PostType.PUBLIC)
                .build();

        when(forumPostRepository.save(any(ForumPost.class))).thenReturn(forumPost);
        forumPostService.saveForumPost(forumPost);
        verify(forumPostRepository, times(1)).save(any(ForumPost.class));
    }
;}
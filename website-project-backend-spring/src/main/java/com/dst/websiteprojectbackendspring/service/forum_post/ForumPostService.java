package com.dst.websiteprojectbackendspring.service.forum_post;

import com.dst.websiteprojectbackendspring.domain.forum_post.ForumPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface ForumPostService {
    void saveForumPost(ForumPost forumPost);
    List<ForumPost> getForumPosts();
    Long countByAuthor(String author);
    Page<ForumPost> getForumPosts(PageRequest pageRequest);
}

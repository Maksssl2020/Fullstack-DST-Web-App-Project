package com.dst.websiteprojectbackendspring.service.forum_post;

import com.dst.websiteprojectbackendspring.domain.forum_post.ForumPost;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface ForumPostService {
    void saveForumPost(ForumPost forumPost);
    List<ForumPost> getForumPosts();
    Page<ForumPost> getForumPosts(PageRequest pageRequest);
    ForumPost getForumPostById(Long id) throws ChangeSetPersister.NotFoundException;
    Long countByAuthor(String author);
    void update(Long id, ForumPost forumPost);
    void delete(Long id) throws ChangeSetPersister.NotFoundException;
}

package com.dst.websiteprojectbackendspring.service.forum_post;

import com.dst.websiteprojectbackendspring.dto.forum_post.ForumPostDTO;
import com.dst.websiteprojectbackendspring.dto.forum_post.ForumPostRequest;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface ForumPostService {
    void saveForumPost(ForumPostRequest forumPostRequest);
    List<ForumPostDTO> getForumPosts();
    Page<ForumPostDTO> getForumPosts(PageRequest pageRequest);
    ForumPostDTO getForumPostById(Long id) throws ChangeSetPersister.NotFoundException;
    Long countByAuthor(Long authorId);
    void update(Long id, ForumPostRequest forumPostRequest);
    void delete(Long id) throws ChangeSetPersister.NotFoundException;
}

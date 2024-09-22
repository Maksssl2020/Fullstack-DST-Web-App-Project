package com.dst.websiteprojectbackendspring.dto.forum_post;

import com.dst.websiteprojectbackendspring.model.forum_post.ForumPost;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class ForumPostDTOMapper implements Function<ForumPost, ForumPostDTO> {
    @Override
    public ForumPostDTO apply(ForumPost forumPost) {
        return new ForumPostDTO(forumPost.getId(), forumPost.getTitle(), forumPost.getContent(), forumPost.getPostType().toString(), forumPost.getCreationDate(), forumPost.getAuthor().getId());
    }
}

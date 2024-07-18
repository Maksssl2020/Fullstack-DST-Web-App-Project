package com.dst.websiteprojectbackendspring.service;

import com.dst.websiteprojectbackendspring.forum_post.ForumPost;

import java.util.List;

public interface ForumPostService {
    void saveForumPost(ForumPost forumPost);
    List<ForumPost> getForumPosts();
    Long countByAuthor(String author);
}

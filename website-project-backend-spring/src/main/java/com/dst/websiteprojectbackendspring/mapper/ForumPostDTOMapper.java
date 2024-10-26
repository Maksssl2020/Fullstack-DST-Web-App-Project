package com.dst.websiteprojectbackendspring.mapper;

import com.dst.websiteprojectbackendspring.dto.forum_post.ForumPostDTO;
import com.dst.websiteprojectbackendspring.model.forum_post.ForumPost;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ForumPostDTOMapper {

    private final ModelMapper modelMapper;

    public ForumPostDTO mapForumPostIntoForumPostDTO(ForumPost forumPost) {
        return modelMapper.map(forumPost, ForumPostDTO.class);
    }
}

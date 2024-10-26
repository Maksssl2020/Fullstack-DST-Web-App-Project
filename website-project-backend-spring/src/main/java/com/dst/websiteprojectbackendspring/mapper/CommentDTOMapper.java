package com.dst.websiteprojectbackendspring.mapper;

import com.dst.websiteprojectbackendspring.dto.comment.CommentDTO;
import com.dst.websiteprojectbackendspring.model.comment.Comment;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class CommentDTOMapper {

    private final ModelMapper modelMapper;

    public CommentDTO mapCommentIntoCommentDTO(Comment comment) {
        log.info("UserId: {}", comment.getUser().getId());

        return modelMapper.map(comment, CommentDTO.class);
    }
}

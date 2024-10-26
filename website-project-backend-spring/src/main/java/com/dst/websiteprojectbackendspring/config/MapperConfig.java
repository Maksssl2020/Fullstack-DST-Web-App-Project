package com.dst.websiteprojectbackendspring.config;

import com.dst.websiteprojectbackendspring.dto.comment.CommentDTO;
import com.dst.websiteprojectbackendspring.model.comment.Comment;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class MapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.typeMap(Comment.class, CommentDTO.class)
                .addMappings(
                        map -> map.map(src -> src.getUser().getId(), CommentDTO::setAuthorId)
                );

        return modelMapper;
    }
}

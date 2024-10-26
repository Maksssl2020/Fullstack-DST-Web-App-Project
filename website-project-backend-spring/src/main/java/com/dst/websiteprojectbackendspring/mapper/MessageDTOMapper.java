package com.dst.websiteprojectbackendspring.mapper;

import com.dst.websiteprojectbackendspring.dto.message.MessageDTO;
import com.dst.websiteprojectbackendspring.model.message.Message;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MessageDTOMapper {

    private final ModelMapper modelMapper;

    public MessageDTO mapMessageIntoMessageDTO(Message message) {
        return modelMapper.map(message, MessageDTO.class);
    }
}

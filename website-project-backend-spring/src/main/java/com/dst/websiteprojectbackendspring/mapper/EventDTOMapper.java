package com.dst.websiteprojectbackendspring.mapper;

import com.dst.websiteprojectbackendspring.dto.event.EventDTO;
import com.dst.websiteprojectbackendspring.model.event.Event;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EventDTOMapper {

    private final ModelMapper modelMapper;

    public EventDTO mapEventIntoEventDTO(Event event){
        return modelMapper.map(event, EventDTO.class);
    }
}

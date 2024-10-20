package com.dst.websiteprojectbackendspring.mapper;

import com.dst.websiteprojectbackendspring.dto.notification.NotificationDTO;
import com.dst.websiteprojectbackendspring.model.notification.Notification;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationDTOMapper {

    private final ModelMapper modelMapper;

    public NotificationDTO mapNotificationIntoNotificationDTO(Notification notification) {
        return modelMapper.map(notification, NotificationDTO.class);
    }
}
